import subprocess
import sys
import os

def update_reviews():
    print("🚀 Starting review update script via Python...")
    
    # Path to your JS file
    js_file = "update-reviews.js"
    
    if not os.path.exists(js_file):
        print(f"❌ Error: {js_file} not found in current directory.")
        sys.exit(1)

    try:
        # We explicitly set encoding='utf-8' and errors='replace' to avoid crashes from emojis or special characters on Windows
        result = subprocess.run(
            ["node", js_file],
            check=True,
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace'
        )
        
        print("✅ JavaScript output:")
        print(result.stdout)
        print("🎉 Reviews updated successfully!")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Execution failed with code {e.returncode}")
        print("Standard Error Output:")
        print(e.stderr)
        sys.exit(1)

if __name__ == "__main__":
    update_reviews()