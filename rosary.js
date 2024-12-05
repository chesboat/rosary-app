console.log('Rosary app initializing...');

const app = new Vue({
    el: '#app',
    data: {
        isDarkMode: false,
        currentBead: null,
        currentMysterySet: null,
        activeTab: 'prayers', // For mobile navigation
        touchStartX: 0,
        touchStartY: 0,
        prayers: {
            crucifix: {
                title: "The Apostles' Creed",
                latin: "Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae. Et in Iesum Christum, Filium eius unicum, Dominum nostrum, qui conceptus est de Spiritu Sancto, natus ex Maria Virgine, passus sub Pontio Pilato, crucifixus, mortuus, et sepultus, descendit ad inferos, tertia die resurrexit a mortuis, ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis, inde venturus est iudicare vivos et mortuos. Credo in Spiritum Sanctum, sanctam Ecclesiam catholicam, sanctorum communionem, remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen.",
                english: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen."
            },
            ourFather: {
                title: "Our Father",
                latin: "Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.",
                english: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen."
            },
            hailMary: {
                title: "Hail Mary",
                latin: "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc, et in hora mortis nostrae. Amen.",
                english: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen."
            },
            gloryBe: {
                title: "Glory Be",
                latin: "Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.",
                english: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen."
            },
            fatima: {
                title: "Fatima Prayer",
                latin: "O mi Iesu, dimitte nobis debita nostra, libera nos ab igne inferni, conduc in caelum omnes animas, praesertim illas quae maxime indigent misericordia tua.",
                english: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those in most need of Thy mercy."
            }
        },
        mysterySets: [
            {
                name: 'Joyful Mysteries',
                mysteries: [
                    {
                        name: 'The Annunciation',
                        meditation: 'In the silence of Nazareth, Mary teaches us the power of surrender to Divine Will. As the Angel Gabriel announces God\'s plan, Mary\'s fiat - her "yes" - becomes the gateway through which Divine Love enters human history. Her humility and trust show us that true joy comes not from asserting our will, but from aligning it with God\'s perfect plan. Let us ask for the grace to say "yes" to God\'s will in our lives, even when His plans seem beyond our understanding.',
                        image: 'annunciation.jpg'
                    },
                    {
                        name: 'The Visitation',
                        meditation: 'Mary, carrying the Divine Life within her, hastens to serve her cousin Elizabeth. In this mystery, we see how grace naturally flows into charity. The presence of Jesus, even hidden in Mary\'s womb, brings joy and causes John the Baptist to leap in Elizabeth\'s womb. Like Mary, may we bring Christ to others through our acts of loving service, knowing that where there is charity and love, there God is truly present.',
                        image: 'visitation.jpg'
                    },
                    {
                        name: 'The Nativity',
                        meditation: 'The King of Kings chooses to be born in a manger, teaching us that true greatness lies in humility. The shepherds and wise men alike find Him wrapped in swaddling clothes, showing that wisdom and simplicity both lead to Christ. In the cold of Bethlehem\'s night, the warmth of Divine Love enters our world. Let us ponder how God continues to come to us in unexpected ways, often in circumstances of poverty and simplicity.',
                        image: 'nativity.jpg'
                    },
                    {
                        name: 'The Presentation',
                        meditation: 'Simeon\'s prophecy reveals that the shadow of the Cross already falls across the Christ Child\'s path. Mary learns that her heart will be pierced, yet she continues forward in faith. This mystery teaches us that joy and sorrow are often intertwined in God\'s plan, and that our dedication to Him may require sacrifice. May we, like Mary, embrace both the joys and sorrows that come with following Christ.',
                        image: 'presentation.jpg'
                    },
                    {
                        name: 'Finding in the Temple',
                        meditation: 'After three days of sorrow, Mary and Joseph find Jesus teaching in His Father\'s house. This prefigures the three days He would later spend in the tomb before the Resurrection. Christ\'s words, "Did you not know that I must be about my Father\'s business?" remind us that our highest allegiance must be to God\'s will. Let us seek Jesus with the same persistence of Mary and Joseph, especially when He seems distant from us.',
                        image: 'finding.jpg'
                    }
                ]
            },
            {
                name: 'Sorrowful Mysteries',
                mysteries: [
                    {
                        name: 'The Agony in the Garden',
                        meditation: 'In Gethsemane, we witness the battle between the human and divine will within Christ. His sweat becomes as drops of blood - the first blood shed for our redemption. Here, Jesus teaches us how to face our own moments of darkness and trial. "Not my will, but Thine be done" becomes the perfect prayer for every soul in distress. Let us unite our sufferings with His, knowing that every Gethsemane in our lives can become a moment of redemptive love.',
                        image: 'agony.jpg'
                    },
                    {
                        name: 'The Scourging at the Pillar',
                        meditation: 'Each lash that tears at Christ\'s flesh is a reminder of the cost of our sins and the depth of His love. In His scourging, Jesus expiates for the sins of the flesh that plague humanity. His silence during this torture teaches us how to bear our own sufferings with dignity and patience. May we learn to mortify our own flesh out of love for Him who was mortified for us.',
                        image: 'scourging.jpg'
                    },
                    {
                        name: 'The Crowning with Thorns',
                        meditation: 'The King of Creation is crowned with thorns - the curse of Adam\'s sin becomes the crown of our redemption. In this mystery, Christ expiates for our sins of pride and intellectual arrogance. The soldiers mock His kingship, not realizing that His true crown is the perfect circle of Divine Love. Let us ask for the grace to accept the thorns in our lives as our own crown of love.',
                        image: 'crowning.jpg'
                    },
                    {
                        name: 'The Carrying of the Cross',
                        meditation: 'Each step of the Via Dolorosa is a lesson in love. Simon of Cyrene learns that in helping Christ carry His Cross, he carries his own more easily. Veronica\'s act of courage and compassion is rewarded with Christ\'s image on her veil - a reminder that we bear His image most clearly when we help others bear their crosses. May we see in our daily crosses not mere burdens, but opportunities to unite ourselves with Christ\'s redemptive work.',
                        image: 'carrying.jpg'
                    },
                    {
                        name: 'The Crucifixion',
                        meditation: 'On Calvary, heaven and earth meet in the perfect sacrifice of love. Christ\'s seven last words from the Cross become a complete lesson in spiritual life: forgiveness, promise, family, abandonment, suffering, fulfillment, and surrender. His Mother and John at the foot of the Cross teach us how to stand faithful in life\'s darkest moments. As we contemplate His death, let us die to ourselves, knowing that in losing our lives for His sake, we truly find them.',
                        image: 'crucifixion.jpg'
                    }
                ]
            },
            {
                name: 'Glorious Mysteries',
                mysteries: [
                    {
                        name: 'The Resurrection',
                        meditation: 'Christ\'s Resurrection transforms every cross into a potential crown, every ending into a new beginning. The empty tomb becomes the womb of the Church\'s faith. Death is no longer an end but a door, not a period but a comma in the story of life. As the risen Christ appeared to His disciples, He continues to appear in our lives, often when we least expect Him, turning our sorrows into joy. May we be witnesses to the Resurrection by living as people of hope.',
                        image: 'resurrection.jpg'
                    },
                    {
                        name: 'The Ascension',
                        meditation: 'Christ ascends to heaven not to abandon us, but to lead us. His physical absence makes possible His spiritual omnipresence in the Church. Now seated at the right hand of the Father, He continues His work through us, His mystical body. The Ascension reminds us that our true homeland is heaven, and that our lives should be a constant ascent toward God. Let us lift up our hearts to where Christ is seated in glory.',
                        image: 'ascension.jpg'
                    },
                    {
                        name: 'The Descent of the Holy Spirit',
                        meditation: 'At Pentecost, the Church is born in fire and wind. The same Spirit that hovered over creation now recreates humanity in divine love. The apostles are transformed from fearful men into fearless missionaries of Christ. This same Spirit continues to work in the Church and in our souls, making us into living temples of God. May we be open to the Spirit\'s gifts and allow ourselves to be used as instruments of renewal in the Church.',
                        image: 'descent.jpg'
                    },
                    {
                        name: 'The Assumption',
                        meditation: 'Mary\'s Assumption shows us our destiny - that one day, soul and body will be united in glory. She who bore the Body of Christ in her womb now has her own body preserved from corruption. The Assumption reminds us that our bodies are sacred vessels, temples of the Holy Spirit, destined for glory. Through Mary\'s Assumption, we learn that our humanity is meant to be transformed, not destroyed, by divine grace.',
                        image: 'assumption.jpg'
                    },
                    {
                        name: 'The Coronation',
                        meditation: 'The humble handmaid is crowned Queen of Heaven and Earth. Mary\'s coronation is the triumph of humility and obedience over pride and rebellion. In her glory, she continues her maternal role, interceding for her children until all the elect are brought to glory. As Queen, she teaches us that true greatness lies in service, and that the way up is the way down. Let us ask her to help us reign with Christ by serving as she did.',
                        image: 'coronation.jpg'
                    }
                ]
            },
            {
                name: 'Luminous Mysteries',
                mysteries: [
                    {
                        name: 'The Baptism of Jesus',
                        meditation: 'At the Jordan, Jesus, though sinless, identifies Himself with sinful humanity. The heavens open, the Spirit descends, and the Father\'s voice declares His pleasure in His Son. This mystery reveals the Trinity and inaugurates Christ\'s public ministry. In our own baptism, we too become beloved sons and daughters of the Father. Let us renew our baptismal commitment to die to sin and live for God.',
                        image: 'baptism.jpg'
                    },
                    {
                        name: 'The Wedding at Cana',
                        meditation: 'At Mary\'s request, Christ transforms water into wine, revealing both His glory and the power of His Mother\'s intercession. This first sign points to the Eucharist, where wine becomes His Blood. Mary\'s words, "Do whatever He tells you," become a program for Christian life. Like the good wine kept until last, God often saves His best gifts for those who wait in faith and obedience.',
                        image: 'wedding.jpg'
                    },
                    {
                        name: 'The Proclamation of the Kingdom',
                        meditation: 'Christ\'s proclamation of the Kingdom is a call to conversion - to see reality with new eyes of faith. His parables reveal the mysteries of God\'s reign, where the last become first, the humble are exalted, and love conquers all. The Kingdom grows like a mustard seed in the field of the world and in the soil of our hearts. May we be good soil where the seed of God\'s word can bear abundant fruit.',
                        image: 'proclamation.jpg'
                    },
                    {
                        name: 'The Transfiguration',
                        meditation: 'On Mount Tabor, Christ\'s divinity shines through His humanity, strengthening His disciples for the scandal of the Cross. This glimpse of glory reveals our own destiny - to be transformed into His likeness from glory to glory. Moses and Elijah represent the Law and Prophets, which find their fulfillment in Christ. May this vision of glory sustain us in our own dark moments.',
                        image: 'transfiguration.jpg'
                    },
                    {
                        name: 'The Institution of the Eucharist',
                        meditation: 'At the Last Supper, Christ gives Himself as food and drink, transforming the Passover into the new and eternal covenant. This gift of the Eucharist extends His Incarnation through time, making His sacrifice present in every Mass. In this mystery, we see Christ\'s humility and love - He who holds the universe in being becomes present under the appearance of bread and wine. Let us approach this great sacrament with awe and gratitude.',
                        image: 'institution.jpg'
                    }
                ]
            }
        ]
    },
    computed: {
        currentPrayer() {
            if (!this.currentBead) return null;
            
            // For the crucifix
            if (this.currentBead === 'crucifix') return this.prayers.crucifix;
            
            // For decade beads
            if (this.currentBead.includes('-ave-')) {
                return this.prayers.hailMary;
            }
            
            // For Our Father beads
            if (this.currentBead.includes('-our-father')) {
                return this.prayers.ourFather;
            }
            
            // For initial sequence
            if (this.currentBead.startsWith('initial-')) {
                if (this.currentBead === 'initial-our-father') return this.prayers.ourFather;
                if (this.currentBead.startsWith('initial-ave-')) return this.prayers.hailMary;
            }
            
            return null;
        },
        showGloryBe() {
            if (!this.currentBead) return false;
            
            // Show Glory Be on the 10th Ave Maria of each decade
            if (this.currentBead.includes('decade-')) {
                const parts = this.currentBead.split('-');
                if (parts[2] === 'ave' && parseInt(parts[3]) === 10) {
                    return true;
                }
            }
            
            // Show Glory Be after the 3rd Hail Mary in initial sequence
            if (this.currentBead === 'initial-ave-3') {
                return true;
            }
            
            return false;
        },
        showFatimaPrayer() {
            if (!this.currentBead) return false;
            
            // Show Fatima Prayer only on the 10th Ave Maria of each decade
            if (this.currentBead.includes('-ave-')) {
                const parts = this.currentBead.split('-');
                const aveNumber = parseInt(parts[parts.length - 1]);
                return aveNumber === 10;
            }
            
            return false;
        },
        currentMystery() {
            if (!this.currentMysterySet || !this.currentBead) return null;
            const match = this.currentBead.match(/decade-(\d+)/);
            if (match) {
                const decadeIndex = parseInt(match[1]) - 1;
                if (decadeIndex >= 0 && decadeIndex < this.currentMysterySet.mysteries.length) {
                    return this.currentMysterySet.mysteries[decadeIndex];
                }
            }
            return null;
        }
    },
    methods: {
        selectMysterySet(set) {
            this.currentMysterySet = set;
        },
        selectBead(beadId) {
            this.currentBead = beadId;
            // On mobile, switch to prayers tab after selecting a bead
            if (window.innerWidth <= 768) {
                this.activeTab = 'prayers';
            }
        },
        handleTouchStart(event) {
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        },
        handleTouchMove(event) {
            if (!this.touchStartX || !this.touchStartY) {
                return;
            }

            const xDiff = this.touchStartX - event.touches[0].clientX;
            const yDiff = this.touchStartY - event.touches[0].clientY;

            // Only handle horizontal swipes
            if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 10) {
                event.preventDefault(); // Prevent scrolling when swiping
                if (xDiff > 0 && this.activeTab === 'beads') {
                    // Swipe left - switch to prayers
                    this.activeTab = 'prayers';
                } else if (xDiff < 0 && this.activeTab === 'prayers') {
                    // Swipe right - switch to beads
                    this.activeTab = 'beads';
                }
            }

            this.touchStartX = null;
            this.touchStartY = null;
        },
        handleTouchEnd() {
            this.touchStartX = null;
            this.touchStartY = null;
        },
        nextBead() {
            if (!this.currentBead) {
                this.selectBead('crucifix');
                return;
            }

            let nextBeadId = null;

            // Handle initial sequence
            if (this.currentBead === 'crucifix') {
                nextBeadId = 'initial-our-father';
            } else if (this.currentBead === 'initial-our-father') {
                nextBeadId = 'initial-ave-1';
            } else if (this.currentBead.startsWith('initial-ave-')) {
                const currentAve = parseInt(this.currentBead.split('-')[2]);
                if (currentAve < 3) {
                    nextBeadId = `initial-ave-${currentAve + 1}`;
                } else {
                    nextBeadId = 'decade-1-our-father';
                }
            }
            // Handle decades
            else if (this.currentBead.includes('decade-')) {
                const [_, decade, type, number] = this.currentBead.split('-');
                const decadeNum = parseInt(decade);
                
                if (type === 'our-father') {
                    nextBeadId = `decade-${decade}-ave-1`;
                } else if (type === 'ave') {
                    const aveNum = parseInt(number);
                    if (aveNum < 10) {
                        nextBeadId = `decade-${decade}-ave-${aveNum + 1}`;
                    } else if (decadeNum < 5) {
                        nextBeadId = `decade-${decadeNum + 1}-our-father`;
                    } else {
                        nextBeadId = 'crucifix'; // Complete the rosary
                    }
                }
            }

            if (nextBeadId) {
                this.selectBead(nextBeadId);
            }
        },
        previousBead() {
            if (!this.currentBead) {
                return;
            }

            let prevBeadId = null;

            // Handle initial sequence
            if (this.currentBead === 'initial-ave-1') {
                prevBeadId = 'initial-our-father';
            } else if (this.currentBead === 'initial-our-father') {
                prevBeadId = 'crucifix';
            } else if (this.currentBead.startsWith('initial-ave-')) {
                const currentAve = parseInt(this.currentBead.split('-')[2]);
                prevBeadId = `initial-ave-${currentAve - 1}`;
            }
            // Handle decades
            else if (this.currentBead.includes('decade-')) {
                const [_, decade, type, number] = this.currentBead.split('-');
                const decadeNum = parseInt(decade);
                
                if (type === 'our-father') {
                    if (decadeNum === 1) {
                        prevBeadId = 'initial-ave-3';
                    } else {
                        prevBeadId = `decade-${decadeNum - 1}-ave-10`;
                    }
                } else if (type === 'ave') {
                    const aveNum = parseInt(number);
                    if (aveNum > 1) {
                        prevBeadId = `decade-${decade}-ave-${aveNum - 1}`;
                    } else {
                        prevBeadId = `decade-${decade}-our-father`;
                    }
                }
            }

            if (prevBeadId) {
                this.selectBead(prevBeadId);
            }
        }
    },
    mounted() {
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                this.nextBead();
            } else if (e.key === 'ArrowLeft') {
                this.previousBead();
            }
        });

        // Check for system dark mode preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.isDarkMode = true;
        }

        // Watch for system dark mode changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            this.isDarkMode = e.matches;
        });
    }
});

console.log('Rosary app initialized');
