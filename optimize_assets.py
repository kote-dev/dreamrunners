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
        'images/textures/preview',  # New preview directory
        'images/bg',
        'images/bg/preview',        # New preview directory
        'images/dreamrunnerpfp',
        'images/buttons',
        'videos'
    ]
    for dir in dirs:
        Path(f"{base_output_dir}/{dir}").mkdir(parents=True, exist_ok=True)

def create_preview_image(input_path, output_path, max_width=None):
    """Create a very low quality preview image"""
    try:
        img = Image.open(input_path)
        
        # Reduce size more aggressively for preview
        if max_width:
            ratio = max_width / img.width
            new_size = (int(img.width * ratio), int(img.height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Save with very low quality for quick loading
        if input_path.lower().endswith('.png'):
            img.save(output_path, 'PNG', optimize=True, quality=1)
        else:
            img.save(output_path, 'JPEG', quality=1, optimize=True)
            
        print(f"Created preview: {output_path}")
        
    except Exception as e:
        print(f"Error creating preview for {input_path}: {e}")

def optimize_image(input_path, output_path, max_width=None):
    """Optimize image while maintaining higher quality"""
    try:
        original_size = get_file_size(input_path)
        img = Image.open(input_path)
        
        # Create preview version for bg and textures
        if any(x in input_path.lower() for x in ['/bg/', '/textures/']):
            preview_path = output_path.replace('/bg/', '/bg/preview/')
            preview_path = preview_path.replace('/textures/', '/textures/preview/')
            preview_width = max_width // 4 if max_width else None  # Even smaller for preview
            create_preview_image(input_path, preview_path, preview_width)

        # Calculate new dimensions if max_width specified
        if max_width and img.width > max_width:
            ratio = max_width / img.width
            new_size = (int(img.width * ratio), int(img.height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)

        # More aggressive optimization for large background images
        if 'bg/' in input_path.lower():
            if input_path.lower().endswith('.png'):
                img.save(output_path, 'PNG', optimize=True, quality=85)
            else:
                img.save(output_path, 'JPEG', quality=75, optimize=True)  # Lower quality for bg
        else:
            # Keep existing high quality for UI elements
            if input_path.lower().endswith('.png'):
                img.save(output_path, 'PNG', optimize=True)
            else:
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

def convert_to_webp(input_path, output_path, quality=85):
    """Convert image to WebP format"""
    try:
        img = Image.open(input_path)
        webp_path = output_path.rsplit('.', 1)[0] + '.webp'
        img.save(webp_path, 'WEBP', quality=quality)
        print(f"Created WebP: {webp_path}")
        return True
    except Exception as e:
        print(f"Error converting to WebP: {e}")
        return False

def process_assets(input_dir, output_dir):
    """Process all assets in the input directory"""
    create_output_dirs(output_dir)
    
    # Define max widths for different image types (reduced sizes)
    size_configs = {
        'bg': 1280,          # Even smaller for backgrounds
        'textures': 1024,    # Keep this size for textures
        'buttons': 128,      # Keep this for UI
        'dreamrunnerpfp': 400  # Keep this for PFPs
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
                # Also create WebP version
                if 'bg/' in input_path.lower():
                    convert_to_webp(input_path, output_path, quality=75)  # Lower quality for bg
                else:
                    convert_to_webp(input_path, output_path, quality=85)  # Higher for UI
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
    input_dir = "src/assets_full"
    output_dir = "src/assets_optimized"
    
    process_assets(input_dir, output_dir)