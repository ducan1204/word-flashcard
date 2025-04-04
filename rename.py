import os
import re

def rename_module_files(src_dir, old_prefix, new_prefix):
    # Convert to absolute path for clarity
    src_dir = os.path.abspath(src_dir)
    print(f"Processing directory: {src_dir}\n")
    all_dirs = []
    all_files = []
    dir_renames = {}   # {old_path: new_path}
    for root,dirs, files in os.walk(src_dir):
        all_dirs.append(root)
        for filename in files:
            all_files.append(os.path.join(root, filename))
    #     print(f"Found directories: {dirs}")
    #     print(f"     Found files: {files}\n")
    # print(f"All directories: {all_dirs}")
    # print(f"All files: {all_files}")

    for old_path in all_files:
        filename = os.path.basename(old_path)
        if old_prefix.lower() in filename.lower():
            print(is_lowercase(old_prefix))
            if old_prefix.lower() in filename:
                mode = "lower"
            else :
                mode = "upper"
            if mode == "lower":
                new_filename = filename.replace(old_prefix, new_prefix)
            else:
                # If old_prefix is not lowercase, we need to ensure the replacement is case-insensitive
                new_filename = filename.replace(old_prefix.title(), new_prefix.title())
                
            new_path = os.path.join(os.path.dirname(old_path), new_filename)
            print(f"Old name: {old_path}")
            print(f"New path: {new_path}")
            
            # Rename the file
            os.rename(old_path, new_path)
            # print(f"Renamed file: {old_path} -> {new_path}")

            # Update file contents
            with open(new_path, 'r', encoding='utf-8') as file:
                content = file.read()
            new_content = re.sub(rf'{old_prefix.lower()}', new_prefix.lower(), content)
            new_content = re.sub(rf'{old_prefix.title()}', new_prefix.title(), new_content)
            with open(new_path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            # print(f"Updated content in: {new_path}")
    for dir_path in all_dirs:
        dir_name = os.path.basename(dir_path)
        if old_prefix.lower() in dir_name.lower():
            new_dir_name = dir_name.replace(old_prefix.lower(), new_prefix.lower())
            new_dir_path = os.path.join(os.path.dirname(dir_path), new_dir_name)
            dir_renames[dir_path] = new_dir_path
            
            os.rename(dir_path, new_dir_path)
            print(f"Renamed directory: {dir_path} -> {new_dir_path}")

def is_lowercase(string):
    """Check if a string is lowercase."""
    return string == string.lower()

# Example usage
rename_module_files("./src/modules/settings", old_prefix="word", new_prefix="setting")