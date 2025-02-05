import os
import subprocess
from PIL import Image
import shutil
from pathlib import Path
from datetime import datetime

def get_file_size(path):
    """Get file size in MB"""
    return os.path.getsize(path) / (1024 * 1024)

def create_output_dirs(base_output_dir):
    """Create output directory structure"""
    dirs = [
        'images/textures',
        'images/bg',
        'images/dreamrunnerpfp',
        'images/buttons',
        'videos'
    ]
    for dir in dirs:
        Path(f"{base_output_dir}/{dir}").mkdir(parents=True, exist_ok=True)

def optimize_image(input_path, output_path, max_width=None):
    """Optimize image while maintaining higher quality"""
    try:
        original_size = get_file_size(input_path)
        img = Image.open(input_path)
        
        # Calculate new dimensions if max_width specified
        if max_width and img.width > max_width:
            ratio = max_width / img.width
            new_size = (int(img.width * ratio), int(img.height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)

        # Save with better quality
        if input_path.lower().endswith('.png'):
            # For PNG, use maximum quality
            img.save(output_path, 'PNG', optimize=True)
        else:
            # For JPEG, use higher quality (85 instead of 60)
            img.save(output_path, 'JPEG', quality=85, optimize=True)
            
        new_size = get_file_size(output_path)
        reduction = ((original_size - new_size) / original_size) * 100
        
        print(f"Optimized: {output_path}")
        print(f"Size reduced from {original_size:.2f}MB to {new_size:.2f}MB ({reduction:.1f}% reduction)")
        
        return original_size, new_size
        
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return 0, 0

def optimize_video(input_path, output_path):
    """Optimize video with better quality preservation"""
    try:
        original_size = get_file_size(input_path)
        
        # For MP4
        if input_path.lower().endswith('.mp4'):
            cmd = [
                'ffmpeg', '-i', input_path,
                '-c:v', 'libx264',     # Video codec
                '-crf', '23',          # Quality (23 instead of 28 - better quality)
                '-preset', 'slow',     # Changed from veryslow for better balance
                '-c:a', 'aac',        # Audio codec
                '-b:a', '128k',       # Better audio bitrate
                '-movflags', '+faststart',
                '-vf', 'scale=\'min(1920,iw)\':\'min(1080,ih)\':force_original_aspect_ratio=decrease',
                '-y',
                output_path
            ]
        # For WebM
        elif input_path.lower().endswith('.webm'):
            cmd = [
                'ffmpeg', '-i', input_path,
                '-c:v', 'libvpx-vp9',
                '-crf', '30',          # Better quality (30 instead of 35)
                '-b:v', '0',
                '-threads', '4',
                '-speed', '1',         # Better quality (1 instead of 0)
                '-vf', 'scale=\'min(1920,iw)\':\'min(1080,ih)\':force_original_aspect_ratio=decrease',
                '-y',
                output_path
            ]
        
        subprocess.run(cmd, check=True)
        
        new_size = get_file_size(output_path)
        reduction = ((original_size - new_size) / original_size) * 100
        
        print(f"Optimized: {output_path}")
        print(f"Size reduced from {original_size:.2f}MB to {new_size:.2f}MB ({reduction:.1f}% reduction)")
        
        return original_size, new_size
        
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return 0, 0

def process_assets(input_dir, output_dir):
    """Process all assets in the input directory"""
    create_output_dirs(output_dir)
    
    # Define max widths for different image types (reduced sizes)
    size_configs = {
        'bg': 1600,          # Reduced from 1920
        'textures': 1024,    # Reduced from 2048
        'buttons': 128,      # Reduced from 256
        'dreamrunnerpfp': 400  # Reduced from 512
    }

    total_original_size = 0
    total_new_size = 0
    processed_files = 0

    start_time = datetime.now()

    for root, _, files in os.walk(input_dir):
        for file in files:
            input_path = os.path.join(root, file)
            relative_path = os.path.relpath(input_path, input_dir)
            output_path = os.path.join(output_dir, relative_path)
            
            # Ensure output directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Determine max width based on file location
            max_width = None
            for key, width in size_configs.items():
                if key in input_path.lower():
                    max_width = width
                    break

            # Process based on file type
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                orig, new = optimize_image(input_path, output_path, max_width)
            elif file.lower().endswith(('.mp4', '.webm')):
                orig, new = optimize_video(input_path, output_path)
            else:
                print(f"Skipping unsupported file: {file}")
                continue
            
            total_original_size += orig
            total_new_size += new
            processed_files += 1

    end_time = datetime.now()
    duration = (end_time - start_time).total_seconds()

    print("\n=== Optimization Summary ===")
    print(f"Files processed: {processed_files}")
    print(f"Total original size: {total_original_size:.2f}MB")
    print(f"Total optimized size: {total_new_size:.2f}MB")
    print(f"Total reduction: {((total_original_size - total_new_size) / total_original_size * 100):.1f}%")
    print(f"Processing time: {duration:.1f} seconds")

if __name__ == "__main__":
    input_dir = "src/assets"
    output_dir = "src/assets_optimized"
    
    process_assets(input_dir, output_dir)