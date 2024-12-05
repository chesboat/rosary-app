import asyncio
from playwright.async_api import async_playwright
import os
import aiohttp
import aiofiles
from urllib.parse import urlparse
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ImageDownloader:
    def __init__(self, output_dir="images/public"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
        
    async def download_image(self, session, url, filename):
        try:
            async with session.get(url) as response:
                if response.status == 200:
                    async with aiofiles.open(filename, mode='wb') as f:
                        await f.write(await response.read())
                    logger.info(f"Successfully downloaded: {filename}")
                    return True
                else:
                    logger.error(f"Failed to download {url}. Status: {response.status}")
                    return False
        except Exception as e:
            logger.error(f"Error downloading {url}: {str(e)}")
            return False

    async def get_images_from_website(self, url):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            try:
                await page.goto(url, wait_until="networkidle")
                
                # Get all image elements
                image_elements = await page.query_selector_all('img')
                image_urls = []
                
                for img in image_elements:
                    # Try different image attributes
                    for attr in ['src', 'data-src', 'data-original']:
                        src = await img.get_attribute(attr)
                        if src:
                            # Convert relative URLs to absolute
                            if not src.startswith(('http://', 'https://')):
                                parsed_base = urlparse(url)
                                base_url = f"{parsed_base.scheme}://{parsed_base.netloc}"
                                src = src if src.startswith('/') else f"/{src}"
                                src = f"{base_url}{src}"
                            
                            if any(src.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif']):
                                image_urls.append(src)
                            break

                logger.info(f"Found {len(image_urls)} images on {url}")
                return list(set(image_urls))  # Remove duplicates
                
            except Exception as e:
                logger.error(f"Error processing {url}: {str(e)}")
                return []
            finally:
                await browser.close()

    async def download_images_from_urls(self, urls):
        async with aiohttp.ClientSession() as session:
            tasks = []
            for url in urls:
                try:
                    filename = os.path.join(self.output_dir, os.path.basename(urlparse(url).path))
                    if not filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                        filename += '.jpg'
                    task = self.download_image(session, url, filename)
                    tasks.append(task)
                except Exception as e:
                    logger.error(f"Error creating download task for {url}: {str(e)}")
            
            results = await asyncio.gather(*tasks, return_exceptions=True)
            return results

    async def process_website(self, url):
        logger.info(f"Processing website: {url}")
        image_urls = await self.get_images_from_website(url)
        if image_urls:
            results = await self.download_images_from_urls(image_urls)
            success_count = sum(1 for r in results if r is True)
            logger.info(f"Successfully downloaded {success_count} out of {len(image_urls)} images")
        else:
            logger.warning(f"No images found on {url}")

async def main():
    # Dictionary mapping search terms to desired filenames
    image_mapping = {
        # Joyful Mysteries
        "Annunciation Mary Angel Gabriel painting": "annunciation.jpg",
        "Visitation Mary Elizabeth painting": "visitation.jpg",
        "Nativity Jesus birth Bethlehem painting": "nativity.jpg",
        "Presentation Jesus Temple painting": "presentation.jpg",
        "Finding Jesus Temple painting": "finding.jpg",
        
        # Sorrowful Mysteries
        "Agony Garden Gethsemane painting": "agony.jpg",
        "Scourging Pillar Jesus painting": "scourging.jpg",
        "Crowning Thorns Jesus painting": "crowning.jpg",
        "Carrying Cross Jesus painting": "carrying.jpg",
        "Crucifixion Jesus painting": "crucifixion.jpg",
        
        # Glorious Mysteries
        "Resurrection Jesus painting": "resurrection.jpg",
        "Ascension Jesus Heaven painting": "ascension.jpg",
        "Pentecost Holy Spirit Apostles painting": "pentecost.jpg",
        "Assumption Mary Heaven painting": "assumption.jpg",
        "Coronation Mary Queen Heaven painting": "coronation.jpg",
        
        # Luminous Mysteries
        "Baptism Jesus Jordan River painting": "baptism.jpg",
        "Wedding Cana Jesus wine miracle painting": "wedding.jpg",
        "Kingdom God Jesus preaching painting": "kingdom.jpg",
        "Transfiguration Jesus Mount Tabor painting": "transfiguration.jpg",
        "Last Supper Eucharist Jesus painting": "eucharist.jpg"
    }
    
    # Art websites to search
    websites = [
        "https://commons.wikimedia.org/wiki/Category:Religious_paintings",
        "https://commons.wikimedia.org/wiki/Category:Paintings_of_the_Life_of_Christ",
        "https://commons.wikimedia.org/wiki/Category:Paintings_of_the_Virgin_Mary",
        "https://commons.wikimedia.org/wiki/Category:Jesus_in_art",
        "https://commons.wikimedia.org/wiki/Category:Virgin_Mary_in_art"
    ]
    
    downloader = ImageDownloader()
    
    # Process each search term and save with the desired filename
    for search_term, filename in image_mapping.items():
        print(f"Searching for {search_term}...")
        for website in websites:
            image_urls = await downloader.get_images_from_website(website)
            if image_urls:
                # Take the first image found
                url = image_urls[0]
                target_path = os.path.join(downloader.output_dir, filename)
                async with aiohttp.ClientSession() as session:
                    success = await downloader.download_image(session, url, target_path)
                if success:
                    print(f"Successfully downloaded {filename}")
                    break
            await asyncio.sleep(1)  # Be nice to the servers

if __name__ == "__main__":
    asyncio.run(main())
