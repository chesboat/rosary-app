#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Download images with -L flag to follow redirects
curl -L -o images/annunciation.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Fra_Angelico_-_The_Annunciation_-_WGA00555.jpg?width=800"
curl -L -o images/visitation.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Domenico_Ghirlandaio_-_Visitation_-_WGA08712.jpg?width=800"
curl -L -o images/nativity.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Sandro_Botticelli_-_Mystic_Nativity_-_Google_Art_Project.jpg?width=800"
curl -L -o images/presentation.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Fra_Angelico_-_Presentation_of_Jesus_in_the_Temple_-_WGA00513.jpg?width=800"
curl -L -o images/finding.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Duccio_di_Buoninsegna_-_Disputa_con_i_Dottori_-_Google_Art_Project.jpg?width=800"
curl -L -o images/agony.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Andrea_Mantegna_-_Agony_in_the_Garden_-_National_Gallery_London.jpg?width=800"
curl -L -o images/scourging.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Flagellation-du-Christ-Piero-della-Francesca.jpg?width=800"
curl -L -o images/crowning.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Fra_Angelico_-_Christ_Crowned_with_Thorns_-_WGA00525.jpg?width=800"
curl -L -o images/carrying.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Lo_Spasimo.jpg?width=800"
curl -L -o images/crucifixion.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Giotto_-_Scrovegni_-_-36-_-_Crucifixion.jpg?width=800"
curl -L -o images/resurrection.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Resurrection_christ_della_francesca.jpg?width=800"
curl -L -o images/ascension.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Giotto_-_Scrovegni_-_-38-_-_Ascension.jpg?width=800"
curl -L -o images/pentecost.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/El_Greco_-_Pentecost_-_Google_Art_Project.jpg?width=800"
curl -L -o images/assumption.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Tizian_041.jpg?width=800"
curl -L -o images/coronation.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Fra_Angelico_-_Coronation_of_the_Virgin_-_Google_Art_Project.jpg?width=800"
curl -L -o images/baptism.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Andrea_del_Verrocchio,_Leonardo_da_Vinci_-_Baptism_of_Christ_-_Uffizi.jpg?width=800"
curl -L -o images/wedding.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Paolo_Veronese_-_The_Wedding_at_Cana_-_WGA24881.jpg?width=800"
curl -L -o images/proclamation.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Fra_Angelico_-_Sermon_on_the_Mount_-_WGA00552.jpg?width=800"
curl -L -o images/transfiguration.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Transfiguration_Raphael.jpg?width=800"
curl -L -o images/eucharist.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg?width=800"
