import os
import requests
from openai import OpenAI
from pathlib import Path

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Dictionary of mysteries and their prompts
MYSTERY_PROMPTS = {
    'finding': {
        'prompt': 'Renaissance style painting of young Jesus teaching in the temple, surrounded by scholars, warm lighting, ornate architecture, religious art style, detailed and respectful',
        'style': 'renaissance painting'
    },
    'agony': {
        'prompt': 'Classical painting style of Jesus praying in the Garden of Gethsemane at night, moonlight filtering through olive trees, angels present, dramatic lighting, religious art style',
        'style': 'classical painting'
    },
    'scourging': {
        'prompt': 'Solemn renaissance painting of Christ at the pillar, muted colors, indirect lighting, respectful portrayal, religious art style, dignified composition',
        'style': 'renaissance painting'
    },
    'crowning': {
        'prompt': 'Medieval art style painting of the crowning with thorns, rich colors, gold accents, religious art style, respectful portrayal, ornate details',
        'style': 'medieval painting'
    },
    'coronation': {
        'prompt': 'Baroque style painting of the coronation of Virgin Mary in heaven, angels, divine light, clouds, religious art style, ornate and detailed',
        'style': 'baroque painting'
    },
    'baptism': {
        'prompt': 'Classical painting of Jesus being baptized in the Jordan River by John the Baptist, dove descending, ethereal light, religious art style, serene atmosphere',
        'style': 'classical painting'
    },
    'crucifixion': {
        'prompt': 'Renaissance style painting of the crucifixion, respectful and dignified portrayal, dramatic sky, Jerusalem in background, religious art style, muted colors',
        'style': 'renaissance painting'
    }
}

def setup_directories():
    """Create necessary directories if they don't exist"""
    Path('images').mkdir(exist_ok=True)
    Path('images/ai_generated').mkdir(exist_ok=True)

def generate_image(mystery_name, prompt, retries=3):
    """Generate an image using DALL-E"""
    try:
        # Generate image using DALL-E
        response = client.images.generate(
            model="dall-e-3",  # Using DALL-E 3 for higher quality
            prompt=prompt,
            size="1024x1024",  # Highest available resolution
            quality="hd",
            style="vivid",
            n=1,
        )

        # Get the image URL
        image_url = response.data[0].url

        # Download the image
        image_response = requests.get(image_url)
        image_response.raise_for_status()
        
        # Save the image
        output_path = f"images/ai_generated/{mystery_name}.jpg"
        with open(output_path, 'wb') as f:
            f.write(image_response.content)
            
        print(f"✓ Successfully generated and saved image for {mystery_name}")
        return True
        
    except Exception as e:
        print(f"✗ Error generating image for {mystery_name}: {str(e)}")
        if retries > 0:
            print(f"Retrying... ({retries} attempts remaining)")
            return generate_image(mystery_name, prompt, retries - 1)
        return False

def main():
    """Main function to generate all missing images"""
    setup_directories()
    
    # Track success and failures
    successful = []
    failed = []
    
    # Generate each missing image
    for mystery, data in MYSTERY_PROMPTS.items():
        print(f"\nProcessing {mystery}...")
        
        # Skip if image already exists
        if os.path.exists(f"images/ai_generated/{mystery}.jpg"):
            print(f"✓ Image already exists for {mystery}")
            successful.append(mystery)
            continue
            
        # Generate new image
        if generate_image(mystery, data['prompt']):
            successful.append(mystery)
        else:
            failed.append(mystery)
            
    # Print summary
    print("\n=== Generation Summary ===")
    print(f"Successfully generated: {len(successful)}/{len(MYSTERY_PROMPTS)} images")
    if failed:
        print("\nFailed to generate:")
        for mystery in failed:
            print(f"- {mystery}")

if __name__ == "__main__":
    main()
