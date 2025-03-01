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

        # Different quality settings based on image type
        if 'bg/' in input_path.lower():
            if input_path.lower().endswith('.png'):
                img.save(output_path, 'PNG', optimize=True, quality=85)
            else:
                img.save(output_path, 'JPEG', quality=75, optimize=True)
        elif 'buttons/' in input_path.lower() or 'flair' in input_path.lower():
            # Higher quality for UI elements
            if input_path.lower().endswith('.png'):
                img.save(output_path, 'PNG', optimize=True)
            else:
                img.save(output_path, 'JPEG', quality=95, optimize=True)
        else:
            # Default quality for other assets
            if input_path.lower().endswith('.png'):
                img.save(output_path, 'PNG', optimize=True)
            else:
                img.save(output_path, 'JPEG', quality=85, optimize=True)
    except Exception as e:
        print(f"Error optimizing image: {e}")
        return False
    return True 