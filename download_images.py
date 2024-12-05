import os
import requests
from urllib.parse import urljoin

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Dictionary of image URLs for each mystery
mystery_images = {
    # Joyful Mysteries
    'joyful1.jpg': 'https://uploads5.wikiart.org/images/fra-angelico/annunciation-1450.jpg',
    'joyful2.jpg': 'https://uploads1.wikiart.org/images/domenico-ghirlandaio/visitation-1491.jpg',
    'joyful3.jpg': 'https://uploads8.wikiart.org/images/giotto/scrovegni-chapel-frescoes-17-nativity-birth-of-jesus.jpg',
    'joyful4.jpg': 'https://uploads5.wikiart.org/images/fra-angelico/presentation-in-the-temple-1442.jpg',
    'joyful5.jpg': 'https://uploads4.wikiart.org/images/william-holman-hunt/the-finding-of-the-saviour-in-the-temple-1860.jpg',
    
    # Sorrowful Mysteries
    'sorrowful1.jpg': 'https://uploads0.wikiart.org/images/el-greco/the-agony-in-the-garden-1590.jpg',
    'sorrowful2.jpg': 'https://uploads3.wikiart.org/images/caravaggio/flagellation-of-christ-1607.jpg',
    'sorrowful3.jpg': 'https://uploads8.wikiart.org/images/hieronymus-bosch/christ-crowned-with-thorns-1510.jpg',
    'sorrowful4.jpg': 'https://uploads7.wikiart.org/images/titian/christ-carrying-the-cross-1565.jpg',
    'sorrowful5.jpg': 'https://uploads4.wikiart.org/images/diego-velazquez/christ-crucified-1632.jpg',
    
    # Glorious Mysteries
    'glorious1.jpg': 'https://uploads0.wikiart.org/images/matthias-grunewald/resurrection-from-the-isenheim-altarpiece-1515.jpg',
    'glorious2.jpg': 'https://uploads1.wikiart.org/images/giotto/scrovegni-chapel-frescoes-38-ascension.jpg',
    'glorious3.jpg': 'https://uploads1.wikiart.org/images/el-greco/pentecost-1600.jpg',
    'glorious4.jpg': 'https://uploads7.wikiart.org/images/peter-paul-rubens/assumption-of-virgin-1626.jpg',
    'glorious5.jpg': 'https://uploads3.wikiart.org/images/diego-velazquez/coronation-of-the-virgin-1645.jpg',
    
    # Luminous Mysteries
    'luminous1.jpg': 'https://uploads0.wikiart.org/images/andrea-del-verrocchio/the-baptism-of-christ-1475.jpg',
    'luminous2.jpg': 'https://uploads1.wikiart.org/images/paolo-veronese/the-wedding-at-cana-1563.jpg',
    'luminous3.jpg': 'https://uploads5.wikiart.org/images/carl-heinrich-bloch/sermon-on-the-mount.jpg',
    'luminous4.jpg': 'https://uploads4.wikiart.org/images/raphael/transfiguration-1520.jpg',
    'luminous5.jpg': 'https://uploads7.wikiart.org/images/leonardo-da-vinci/the-last-supper-1495.jpg'
}

def download_image(url, filename):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        filepath = os.path.join('images', filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded {filename}")
        
    except Exception as e:
        print(f"Error downloading {filename}: {str(e)}")

# Download all images
for filename, url in mystery_images.items():
    download_image(url, filename)
