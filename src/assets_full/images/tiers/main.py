from PIL import Image
import os
from PIL.GifImagePlugin import GifImageFile

def optimize_images(folder):
    optimized_folder = os.path.join(folder, 'optimized')
    if not os.path.exists(optimized_folder):
        os.makedirs(optimized_folder)
    
    # Skip files that are in the optimized folder
    for file in os.listdir(folder):
        if file.endswith(('.gif', '.png')) and not os.path.dirname(file) == optimized_folder:
            input_path = os.path.join(folder, file)
            output_path = os.path.join(optimized_folder, file)
            
            # Skip if already optimized
            if os.path.exists(output_path):
                continue
                
            img = Image.open(input_path)
            
            if file.endswith('.gif'):
                if isinstance(img, GifImageFile):
                    frames = []
                    for frame in range(img.n_frames):
                        img.seek(frame)
                        new_frame = img.copy()
                        if new_frame.size[0] > 300:  # Reduced to 300px
                            ratio = 300 / new_frame.size[0]
                            new_size = (300, int(new_frame.size[1] * ratio))
                            new_frame = new_frame.resize(new_size, Image.Resampling.LANCZOS)
                        frames.append(new_frame)
                    
                    frames[0].save(
                        output_path,
                        save_all=True,
                        append_images=frames[1:],
                        optimize=True,
                        quality=50,  # Further reduced quality
                        duration=img.info['duration'],
                        loop=0
                    )
            else:
                img = img.convert('RGBA')
                if img.size[0] > 300:  # Reduced to 300px
                    ratio = 300 / img.size[0]
                    new_size = (300, int(img.size[1] * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                
                img.save(
                    output_path,
                    'PNG',
                    optimize=True,
                    quality=50
                )
            
            print(f"Optimized: {file}")
            original_size = os.path.getsize(input_path) / 1024  # KB
            new_size = os.path.getsize(output_path) / 1024  # KB
            print(f"Size reduced from {original_size:.1f}KB to {new_size:.1f}KB")

folder = "."
optimize_images(folder)