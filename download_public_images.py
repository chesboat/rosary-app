import os
import time
import requests
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Dictionary of mysteries and their URLs
MYSTERY_IMAGES = {
    'finding': {
        'url': 'https://www.wga.hu/html/d/duccio/maesta/verso_1/verso12.html',
        'title': 'Christ among the Doctors by Duccio'
    },
    'agony': {
        'url': 'https://www.wga.hu/html/m/mantegna/09/3garden.html',
        'title': 'Agony in the Garden by Mantegna'
    },
    'scourging': {
        'url': 'https://www.wga.hu/html/p/piero/francesc/flagella/flagell.html',
        'title': 'Flagellation of Christ by Piero della Francesca'
    },
    'crowning': {
        'url': 'https://www.wga.hu/html/g/grunewal/2isenhei/1view/03mock.html',
        'title': 'The Crowning with Thorns by Matthias Grünewald'
    },
    'carrying': {
        'url': 'https://www.wga.hu/html/b/bruegel/pieter_e/03/07way.html',
        'title': 'The Way to Calvary by Bruegel'
    },
    'coronation': {
        'url': 'https://www.wga.hu/html/a/angelico/07/coronat.html',
        'title': 'Coronation of the Virgin by Fra Angelico'
    },
    'baptism': {
        'url': 'https://www.wga.hu/html/v/verrocch/painting/baptism.html',
        'title': 'The Baptism of Christ by Verrocchio and Leonardo'
    }
}

def setup_directories():
    """Create necessary directories if they don't exist"""
    Path('images').mkdir(exist_ok=True)
    Path('images/public').mkdir(exist_ok=True)

def setup_driver():
    """Set up Chrome driver with appropriate options"""
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # Run in headless mode
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def download_image(driver, mystery_name, url):
    """Download image using Selenium"""
    try:
        print(f"\nProcessing {mystery_name}...")
        driver.get(url)
        
        # Wait for the image to load
        wait = WebDriverWait(driver, 10)
        img_element = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "img[src*='art']"))
        )
        
        # Get the image URL
        img_url = img_element.get_attribute('src')
        if not img_url:
            raise ValueError("Could not find image URL")
            
        # Download the image using requests
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': url
        }
        
        response = requests.get(img_url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Save the image
        output_path = f"images/public/{mystery_name}.jpg"
        with open(output_path, 'wb') as f:
            f.write(response.content)
            
        print(f"✓ Successfully downloaded {MYSTERY_IMAGES[mystery_name]['title']} ({len(response.content)} bytes)")
        return True
        
    except Exception as e:
        print(f"✗ Error downloading {mystery_name}: {str(e)}")
        return False

def main():
    """Main function to download all images"""
    setup_directories()
    
    # Track success and failures
    successful = []
    failed = []
    
    # Initialize the driver
    driver = setup_driver()
    
    try:
        # Download each image
        for mystery, data in MYSTERY_IMAGES.items():
            if download_image(driver, mystery, data['url']):
                successful.append(mystery)
            else:
                failed.append(mystery)
                
        # Print summary
        print("\n=== Download Summary ===")
        print(f"Successfully downloaded: {len(successful)}/{len(MYSTERY_IMAGES)} images")
        
        if successful:
            print("\nSuccessfully downloaded:")
            for mystery in successful:
                print(f"- {MYSTERY_IMAGES[mystery]['title']}")
                
        if failed:
            print("\nFailed to download:")
            for mystery in failed:
                print(f"- {MYSTERY_IMAGES[mystery]['title']}")
                
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
