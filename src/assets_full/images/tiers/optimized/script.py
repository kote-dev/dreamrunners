from PIL import Image
import os

gifs = [f for f in os.listdir('.') if f.endswith('.gif')]

for gif in gifs:
    original_size = os.path.getsize(gif) / (1024 * 1024)
    img = Image.open(gif)
    
    frames = []
    try:
        while True:
            frames.append(img.copy())
            img.seek(img.tell() + 1)
    except EOFError:
        pass

    # Final optimization
    width = 250  # Even smaller
    ratio = width / frames[0].size[0]
    height = int(frames[0].size[1] * ratio)
    
    resized_frames = [frame.resize((width, height), Image.Resampling.LANCZOS).quantize(colors=32) for frame in frames]
    resized_frames = [frame.resize((width, height), Image.Resampling.LANCZOS).quantize(colors=64) for frame in frames]
    
    temp_name = f'temp_{gif}'
    resized_frames[0].save(
        temp_name,
        save_all=True,
        append_images=resized_frames[1:],
        duration=img.info.get('duration', 100),
        loop=img.info.get('loop', 0),
        optimize=True
    )
    
    new_size = os.path.getsize(temp_name) / (1024 * 1024)
    print(f"{gif}: {original_size:.1f}MB -> {new_size:.1f}MB ({(new_size/original_size*100):.1f}%)")
    
    os.remove(gif)
    os.rename(temp_name, gif)