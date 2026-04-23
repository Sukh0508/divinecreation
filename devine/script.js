// ---- PRODUCT DATA ----
const PRODUCTS = [
  { id:1, name:"Gau Mata", cat:"gifting", price:899.0, old:1299.0, img:"https://divinecreationsgift.com/media/shop-72/product-gau-mata/gau-mata-7aa49b.jpg", stars:"4.9", desc:"Gau Mata, or the sacred Cow, is revered in Hinduism as a symbol of purity, motherhood, and the giver of life. As the embodiment of selfless service and nourishment, she is venerated for her role in sustaining life and offering abundance. Worshiping Gau Mata brings blessings of prosperity, peace, and protection for both the individual and the family." },
  { id:2, name:"Divine Ladu Gopal Idol", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-ladu-gopal-idol-code-k3/divine-ladu-gopal-idol-code-k3-6c634b.jpg",stars:"5.0", reviews:"(183)", desc:"Bring home the divine presence of Ladu Gopal, the child form of Lord Krishna, with this exquisitely designed idol. The Divine Ladu Gopal Idol (Code-K3) features fine detailing that captures the playful and serene expression of Bal Gopal, spreading positivity and devotion in every space." },
  { id:3, name:"Lord Krishna with Cow Idol – 16 Inch", cat:"Idol", img:"https://divinecreationsgift.com/media/shop-72/product-lord-krishna-with-cow-idol-16-inch/lord-krishna-with-cow-idol-16-inch-e0ed91.jpg",stars:"4.8", reviews:"(412)", desc:"Bring home divine grace and positive energy with this elegant 16-inch Lord Krishna with Cow idol, crafted from high-quality marble powder. Lord Krishna is the symbol of love, joy, wisdom, and protection, while the cow represents purity, motherhood, and abundance. Together, they create a powerful spiritual presence that fills your space with peace and devotion." },
  { id:4, name:"Divine Ram Parivaar Idol", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-ram-parivaar-idol/divine-ram-parivaar-idol-6d0f43.jpg",stars:"4.7", reviews:"(98)", desc:"With an impressive height of 8 inches, this idol is perfect for home temples, pooja rooms, and spiritual décor spaces. The balanced design and detailed expressions enhance its divine appeal, making it suitable for daily worship as well as festive occasions like Ram Navami and Diwali. The Ram Parivaar idol also makes an auspicious and meaningful gift for housewarming ceremonies, weddings, and religious celebrations, bringing peace, prosperity, and positive energy into any home." },
  { id:5, name:"Lord Hanuman Ji Idol", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-lord-hanuman-ji-idol/lord-hanuman-ji-idol-b6ebef.jpg", badge:null, badgeLabel:"", stars:"4.6", reviews:"(155)", desc:"Bring home the divine power and blessings of Lord Hanuman Ji with this beautifully designed idol crafted from premium marble powder. Lord Hanuman is worshipped as the symbol of strength, devotion, loyalty, and fearlessness, and his presence is believed to protect the home from negative energies while inspiring courage and confidence." },
  { id:6, name:"Divine Shiv Shakti Hand with Trishul – Gold Plated Idol", cat:"Krishna hand",img:"https://divinecreationsgift.com/media/shop-72/product-divine-shiv-shakti-hand-with-trishul-gold-plated-idol/divine-shiv-shakti_jBATKHY.jpg",stars:"4.9", reviews:"(302)", desc:"The Divine Shiv Shakti Hand with Trishul – Gold Plated Idol is a powerful representation of Lord Shiva’s blessings and eternal strength. The blue-colored Shiv hand firmly holding the Trishul signifies protection, courage, and the destruction of negativity, while the golden Om symbol enhances its spiritual significance." },
  { id:7, name:"Lord Ram", cat:"",price:899.0, old:1299.0, img:"https://divinecreationsgift.com/media/shop-72/product-lord-ram/lord-ram-8a34ef.jpg",stars:"4.8", reviews:"(67)", desc:"Lord Ram, the epitome of virtue, righteousness, and devotion, is revered as the seventh incarnation of Lord Vishnu. He symbolizes dharma (duty), truth, and the triumph of good over evil, inspiring millions with his divine legacy from the Ramayana." },

  { id:8, name:"Tirupati Balaji",cat:"", price:899.0, old:1299.0, img:"https://divinecreationsgift.com/media/shop-72/product-tirupati-balaji/tirupati-balaji-43fce4.jpg", badge:"", badgeLabel:"", stars:"4.7", reviews:"(289)", desc:"Premium assorted dry fruits in a keepsake wooden box. Includes almonds, cashews, pistachios, walnuts, and saffron. A timeless gifting choice." },
  { id:9, name:"Decorative Photo Frame", cat:"Frame", price:1500.0, old:2000.0, img:"https://divinecreationsgift.com/media/shop-72/product-487/decorative-photo-frame-b4546b.jpg", badge:null, badgeLabel:"", stars:"4.6", reviews:"(218)", desc:" Add a touch of elegance and personality to your space with our decorative photo frames. Crafted with intricate designs and high-quality materials, these frames are perfect for showcasing your cherished memories. Whether placed in your living room, bedroom, or office, they elevate your decor while preserving your favorite moments. Ideal for gifting, these frames offer a blend of style and functionality, making them a timeless addition to any home or workspace." },
  { id:10, name:"Divine Bal Krishna Idol", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-bal-krishna-idol-code-k1/divine-bal-krishna-idol-code-k1-86b6c9.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(42)", desc:"Bring home the divine charm of Bal Krishna, the child form of Lord Krishna, with this exquisitely designed idol. The Divine Bal Krishna Idol (Code K1) captures the innocence, playfulness, and spiritual purity of Bal Gopal, spreading positivity and devotion in every space." },
  { id:11, name:"Lord Hanuman",cat:"", price:899.0, old:1299.0, img:"https://divinecreationsgift.com/media/shop-72/product-lord-hanuman/lord-hanuman-5fcd4b.jpg", stars:"4.5", reviews:"(88)", desc:"Lord Hanuman, the embodiment of strength, devotion, and humility, is revered as one of the greatest heroes in Hindu mythology. Known for his unwavering devotion to Lord Ram, Hanuman represents courage, selfless service, and the power of overcoming challenges. His presence is believed to bring protection, success, and spiritual enlightenment to his devotees." },
  { id:12, name:"Spiritual Saint Meditation", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-spiritual-saint-meditation-idol/spiritual-saint-meditation-idol-675985.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(375)", desc:"This finely crafted Spiritual Saint meditation idol is made from high-quality marble powder and reflects deep devotion, simplicity, and inner strength. The idol is shown in a calm seated posture, representing self-realization, discipline, and spiritual wisdom. The detailed facial expression, traditional markings, and serene posture give the idol a powerful spiritual presence." },
  { id:13,name:"Wooden Photo Frame",cat:"Frame", price:1299.0,old:1500.0,img:"https://divinecreationsgift.com/media/shop-72/product-wooden-photo-frame/wooden-photo-frame-2df64a.jpg",reviews:"(150)", stars:"4.7", desc:"Bring a warm, rustic charm to your home with our wooden photo frames. Made from high-quality wood, each frame is carefully crafted to enhance your photographs while adding a natural, timeless touch to your decor. Perfect for displaying family photos, artwork, or treasured memories, these frames blend seamlessly into any setting, whether traditional or contemporary. A great gift idea or a perfect addition to your living room, office, or personal space, these frames offer both durability and elegance." },
  { id:14, name:"Chhatrapati Shivaji Maharaj", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-chhatrapati-shivaji-maharaj-idol-10-inches/chhatrapati-shivaji-maharaj-i_Q2B1mTM.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(210)", desc:"Celebrate the greatness and heroic legacy of Chhatrapati Shivaji Maharaj with this beautifully crafted 10-inch statue. Designed with attention to detail, this idol captures the royal posture, brave expression, and strong personality of the great Maratha warrior king. It stands as a symbol of bravery, intelligence, justice, and leadership." },
  { id:15, name:"Divine Durgamata", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-durgamata-idol-15-feet-decorative-statue/divine-durgamata-idol-15_D8x7oOB.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(320)", desc:"Bring home the divine presence of Maa Durga with this stunning 1.5 feet tall Durgamata idol. Designed with fine detailing and graceful expressions, this statue reflects strength, courage, and motherly love. Maa Durga is worshipped as the symbol of power and the destroyer of evil, making this idol an ideal choice for Navratri, Durga Puja, daily पूजा, and spiritual décor." },
  { id:16, name:"Lord Ganesha", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-lord-ganesha-idol/lord-ganesha-idol-5a5945.jpg", stars:"4.7", reviews:"(190)", desc:"Bring home the divine blessings of Lord Ganesha, the remover of obstacles and the god of wisdom and prosperity, with this elegant 9-inch marble powder statue. This idol is crafted with fine detailing, vibrant colors, and a smooth glossy finish, giving it a rich and attractive look. " },
  { id:17, name:"Radha Krishna 16 Inches", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-radha-krishna-idol-16-inches/radha-krishna-idol-16-inches-a5e3c6.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(85)", desc:"Radha Krishna idols are considered symbols of true love, peace, happiness, and prosperity. This statue is perfect for decorating your home temple, living room, office, hotel, or spiritual space. The graceful posture, traditional attire, and calm expressions add a serene and divine charm to any place." },
  { id:18, name:"Divine Tirupati Balaji", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-tirupati-balaji-idol/divine-tirupati-balaji-idol-d4f206.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(120)", desc:"Invite the divine presence of Lord Venkateswara (Tirupati Balaji) into your home with this exquisitely designed idol. The Divine Tirupati Balaji Idol reflects devotion, spiritual grace, and the timeless blessings of Lord Balaji. With fine detailing and a majestic posture, it enhances both the spiritual and aesthetic appeal of any space." },
  { id:19, name:"Lord Hanuman Ji in Yog Mudra (Marble Powder, 23 cm)", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-lord-hanuman-ji-idol-in-yog-mudra-marble-powder-23-cm/lord-hanuman-ji-id_ScOXDVk.jpg", badge:"", badgeLabel:"", stars:"4.7", reviews:"(140)", desc:"This beautifully designed Lord Hanuman Ji Idol in Yog Mudra represents divine power, devotion, discipline, and spiritual balance. Depicted in a serene meditative posture, Lord Hanuman Ji inspires inner strength, focus, and positivity." },
  { id:20, name:"Divine Radha Krishna with Nandi", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-radha-krishna-with-nandi-idol-rk1/divine-radha-krishna-with-nandi_rlhFmV5.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(60)", desc:"The Divine Radha Krishna with Nandi Idol (RK1) is a symbol of pure love, devotion, and divine balance. Radha and Krishna together represent eternal love and spiritual unity, while Nandi, the sacred bull, signifies strength, faith, and devotion. This unique combination makes the idol deeply meaningful and spiritually powerful. " },
  { id:21, name:"Lord Krishna – 24 Inches", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-lord-krishna-idol-24-inches/lord-krishna-idol-24-inches-bc7fb0.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(180)", desc:"Bring home the divine charm and blessings of Lord Krishna with this stunning 24-inch marble powder statue. Beautifully crafted with fine detailing and elegant finishing, this idol captures Lord Krishna in his classic flute-playing posture, symbolizing love, joy, compassion, and spiritual harmony." },
  { id:22, name:"Lord Krishna", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-lord-krishna/lord-krishna-f07376.jpg", badge:"", badgeLabel:"", stars:"4.7", reviews:"(110)", desc:"Lord Krishna, the divine embodiment of love, compassion, and joy, is revered as the supreme god in Hinduism. Known for his playful nature, wisdom, and miraculous deeds, Krishna is worshipped as the protector of the universe and the source of ultimate truth. His teachings in the Bhagavad Gita inspire millions to live a life of righteousness, devotion, and balance." },
  { id:23, name:"Elegant Photo Frame", cat:"Frame",img:"https://divinecreationsgift.com/media/shop-72/product-elegant-photo-frame/elegant-photo-frame-a981f4.jpg", badge:"", badgeLabel:"", stars:"4.7", reviews:"(98)", desc:"Capture life's most precious moments with an elegant photo frame. Available in various styles and finishes, these frames beautifully display your photos, creating timeless memories. Perfect for home decor or as thoughtful gifts for loved ones." },
  { id:24, name:"Divine Diamond Ganesh – Code S8", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-diamond-ganesh-idol-code-s8/divine-diamond-ganesh-idol-code-s8-2a0185.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(75)", desc:"Enhance your space with the divine elegance of the Divine Diamond Ganesh Idol (Code S8). Designed with a unique diamond-cut style, this idol reflects brilliance, positivity, and spiritual grace. Lord Ganesha, the remover of obstacles and the god of wisdom and prosperity, is beautifully portrayed with fine detailing and a radiant finish." },
  { id:25, name:"Divine Lord Ganesha – Code P1", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-lord-ganesha-idol-code-p1/divine-lord-ganesha-idol-code-p1-6dc41b.jpg", badge:"", badgeLabel:"", stars:"4.7", reviews:"(130)", desc:"Invite auspiciousness and positive energy into your space with the Divine Lord Ganesha Idol (Code P1). Lord Ganesha, the remover of obstacles and the god of wisdom and success, is gracefully depicted with fine detailing and a serene expression that enhances its devotional charm." },
  { id:26, name:"Lord Ganesh", cat:"", price:899.0, old:1299.0, img:"https://divinecreationsgift.com/media/shop-72/product-lord-ganesh/lord-ganesh-a7a450.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(200)", desc:"Lord Ganpati, the remover of obstacles and the god of wisdom, prosperity, and new beginnings, is one of the most beloved deities in Hinduism. With his elephant head and gentle nature, Ganesh is worshipped for success, good fortune, and the removal of challenges, making him an ideal presence in any home or temple." },
  { id:27, name:"Divine Dhanushdhari Lord Ram – Gold Plated Finish", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-dhanushdhari-lord-ram-idol-gold-plated-finish/divine-dhanushdhari_8DJ3JpT.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(90)", desc:"The Divine Dhanushdhari Lord Ram Idol – Gold Plated Finish is a timeless symbol of dharma, devotion, and inner strength. Depicting Lord Ram in his iconic bow-holding posture, this idol represents truth, discipline, and the victory of good over evil. " },
  { id:28, name:"Divine Flute Krishna – Code K2", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-flute-krishna-idol-code-k2/divine-flute-krishna-idol-code-k2-9823d6.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(110)", desc:"Invite serenity and spiritual grace into your space with the Divine Flute Krishna Idol (Code K2). Depicting Lord Krishna playing the flute, this idol represents divine love, joy, and inner peace. The fine craftsmanship and graceful posture enhance its devotional and aesthetic appeal." },
  { id:29, name:"Divine Radha Krishna", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-radha-krishna-idol/divine-radha-krishna-idol-055b2c.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(85)", desc:"Bring home the divine presence of Lord Krishna and Radha, the eternal symbols of love, devotion, and spiritual unity. This Divine Radha Krishna Idol is exquisitely designed with fine detailing and graceful expressions that enhance its devotional and aesthetic appeal." },
  { id:30, name:"Divine Krishna Hand Idol", cat:"Krishna hand",img:"https://divinecreationsgift.com/media/shop-72/product-divine-krishna-hand-idol/divine-krishna-hand-idol-21ff73.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(120)", desc:"Bring home the sacred blessings of Lord Krishna with this exquisitely designed Divine Krishna Hand Idol. Representing divine protection, compassion, and spiritual guidance, the hand of Lord Krishna is a powerful symbol of positivity and reassurance. The fine craftsmanship and elegant detailing enhance its devotional and artistic appeal." },
  { id:31, name:"Lord Ram Standing – 14 Inches", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-lord-ram-standing-idol-14-inches/lord-ram-standing-idol-14-inches-3b871b.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(80)", desc:"This elegant 14-inch Lord Ram (Ramji) idol is a perfect representation of divinity, strength, and moral values. Lord Ram is worshipped as the symbol of truth, duty, discipline, and ideal character. His calm expression and graceful posture create a peaceful and spiritual atmosphere in any space." },
  { id:32, name:"Customizable Photo Frame", cat:"Frame",price:500.0,old:800.0,img:"https://divinecreationsgift.com/media/shop-72/product-customizable-photo-frame/customizable-photo-frame-039975.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(70)", desc:"Create a one-of-a-kind keepsake with our customizable photo frames. Whether you want to engrave a name, special date, or meaningful message, these frames offer the perfect way to personalize your photos. Crafted with precision and style, these frames make an ideal gift for birthdays, anniversaries, weddings, or any special occasion. A timeless and thoughtful gift, they allow you to preserve memories in a unique and personal way, while adding a touch of individuality to your space." },
  { id:33, name:"Chhatrapati Shivaji Maharaj– Royal Statue (Code 906)", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-chhatrapati-shivaji-maharaj-idol-royal-statue-code-906/chhatrapati-shiva_SQrAQ0S.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(150)", desc:"Honor the great legacy of Chhatrapati Shivaji Maharaj with this elegant royal statue. Designed with detailed craftsmanship, this idol beautifully captures the strong posture, fearless expression, and dignified personality of the great Maratha king. It represents courage, wisdom, discipline, and patriotism." },
  { id:34, name:"Saraswati Maa Idol – 14 Inches", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-saraswati-maa-idol-14-inches/saraswati-maa-idol-14-inches-6c1fc5.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(200)", desc:"Bring divine knowledge and positive energy into your home with this elegant Saraswati Maa idol made from premium marble powder. With a height of 14 inches, this statue is designed with fine detailing, smooth finish, and a peaceful expression that reflects the grace and purity of Goddess Saraswati." },
  { id:35, name:"Lord Buddha Marble Powder Meditation", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-lord-buddha-marble-powder-meditation-idol/lord-buddha-marble-powder-medi_U6GpSia.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(180)", desc:"Invite prosperity, wisdom, and positive energy into your home with the Divine Lakshmi Ganesh Idol. This beautifully crafted statue features Lord Ganesha, the remover of obstacles and the god of wisdom, alongside Goddess Lakshmi, the goddess of wealth and prosperity. The intricate detailing and vibrant colors enhance its devotional and aesthetic appeal." },
  { id:36, name:"Lord Hanuman Ji", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-lord-hanuman-ji-idol/lord-hanuman-ji-idol-e8129c.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(220)", desc:"Bring home the divine power and blessings of Lord Hanuman Ji with this beautifully designed idol crafted from premium marble powder. Lord Hanuman is worshipped as the symbol of strength, devotion, loyalty, and fearlessness, and his presence is believed to protect the home from negative energies while inspiring courage and confidence." },
  { id:37, name:"Divine Matki Krishna Idol – Code K5", cat:"Idol",img:" https://divinecreationsgift.com/media/shop-72/product-divine-matki-krishna-idol-code-k5/divine-matki-krishna-idol-code-k5-8f93aa.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(130)", desc:"Bring home the playful and divine essence of Bal Krishna with the Divine Matki Krishna Idol (Code K5). Depicting Lord Krishna with the butter pot (matki), this idol represents happiness, abundance, and childlike purity. The fine craftsmanship and expressive detailing enhance its spiritual and decorative appeal." },
  { id:38, name:"Shiv Ling", cat:"", price:899.0,old:1299.0, img:"https://divinecreationsgift.com/media/shop-72/product-shiv-ling/shiv-ling-4164d9.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(150)", desc:"The Shiv Ling is a sacred representation of Lord Shiva, symbolizing both his formless and physical presence. As an embodiment of creation, preservation, and destruction, it is revered by devotees seeking spiritual transformation, inner peace, and divine blessings. The Shiv Ling is a powerful symbol of Lord Shiva's infinite power and cosmic energy." },
  { id:39, name:"Divine Ram Parivaar Idol – Compact Edition", cat:"",img:"https://divinecreationsgift.com/media/shop-72/product-divine-ram-parivaar-idol-compact-edition/divine-ram-parivaar-idol-compac_FIrHbse.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(180)", desc:"The Divine Ram Parivaar Idol – Compact Edition beautifully represents the sacred family of Lord Ram, Goddess Sita, Lord Lakshman, and Lord Hanuman, embodying the values of dharma, devotion, and harmony. Despite its compact size, this idol features elegant detailing and a graceful design that enhances its spiritual appeal." },
  { id:40, name:"Divine Lord Shiva Idol", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-lord-shiva-idol/divine-lord-shiva-idol-824a3b.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(250)", desc:"Bring home the divine energy of Lord Shiva, the destroyer of negativity and the embodiment of meditation, strength, and spiritual wisdom. The Divine Lord Shiva Idol is exquisitely designed with fine detailing, reflecting his majestic presence and serene expression, making it both a devotional and decorative piece." },
  { id:41, name:"Divine Aaram Ganesh Idol – Code S6", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-aaram-ganesh-idol-code-s6/divine-aaram-ganesh-idol-code-s6-0f8f4b.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(200)", desc:"Bring calmness and divine blessings into your space with the Divine Aaram Ganesh Idol (Code S6). Depicting Lord Ganesha in a relaxed and peaceful posture, this idol represents inner peace, wisdom, and the removal of obstacles. The graceful design and fine detailing enhance its spiritual and aesthetic appeal." },
  { id:42, name:"Radha Krishna with Cow Idol – 10 Inch", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-radha-krishna-with-cow-idol-10-inch/radha-krishna-with-cow-idol-10-inch-6cbd34.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(220)", desc:"Enhance your space with divine love and spiritual beauty with this elegant Radha Krishna with Cow idol, crafted from premium-quality marble powder. Radha and Krishna together represent eternal love, devotion, and unity, while the cow symbolizes purity, gentleness, and prosperity. This combination creates a peaceful and highly auspicious presence in any environment." },
  { id:43, name:"Shyam Dev Idol", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-shyam-dev-idol/shyam-dev-idol-4576de.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(180)", desc:"Bring spiritual grace and positive energy into your space with this beautifully designed Shyam Dev idol, crafted from premium marble powder. The statue features traditional attire, rich colors, and fine detailing that reflect devotion, dignity, and divine presence. Shyam Dev is worshipped with deep faith and is believed to bless devotees with peace, protection, and prosperity."},
  { id:44, name:"Sacred Om Cow Idol", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-sacred-om-cow-idol/sacred-om-cow-idol-e2b37e.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(300)", desc:"The Sacred Om Cow Idol represents holiness, nourishment, and spiritual abundance in Hindu tradition. Designed with the sacred Om symbol, this idol radiates peace and positive vibrations, making it a perfect addition to any spiritual space." },
  { id:45, name:"Divine Krishna Hand – 7 Inches", cat:"Krishna hand",img:"https://divinecreationsgift.com/media/shop-72/product-divine-krishna-hand-idol-7-inches/divine-krishna-hand-idol-7-inches-272125.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(150)", desc:"Experience the grace and blessings of Lord Krishna with this exquisitely designed Krishna Hand Idol. Representing divine protection and guidance, the hand of Lord Krishna is a powerful symbol of positivity, peace, and spiritual reassurance. The detailed craftsmanship and elegant design make it a striking addition to any devotional or decorative space." },  
  { id:46, name:"Divine Gold-Plated Idol – Code S2", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-gold-plated-idol-code-s2/divine-gold-plated-idol-code-s2-c19d9f.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(250)", desc:"The Divine Gold-Plated Idol (Code-S2) is a beautifully designed spiritual artifact that brings positivity, peace, and divine energy into your surroundings. Finished with a rich gold-plated coating, this idol showcases intricate craftsmanship and a graceful appearance." },
  { id:47, name:"Vitthal Rukmini Idol – 18 Inches", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-vitthal-rukmini-idol-18-inches/vitthal-rukmini-idol-18-inches-21e900.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(200)", desc:"Bring home the divine grace and blessings of Lord Vitthal and Goddess Rukmini with this elegant 18-inch idol set. This statue beautifully represents the pure devotion and eternal bond between Vitthal and Rukmini, making it a powerful symbol of faith, love, and spiritual strength." },
  { id:48, name:"Divine Radha Krishna Gold-Plated Idol", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-radha-krishna-gold-plated-idol/divine-radha-krishna-gold-plated-i_DPRvvGK.jpg", badge:"", badgeLabel:"", stars:"4.9", reviews:"(300)", desc:"Experience the eternal love and divine presence of Lord Krishna and Radha with this exquisitely designed Radha Krishna Gold-Plated Idol. Crafted with intricate workmanship and a radiant gold-plated finish, this idol reflects grace, devotion, and spiritual harmony." },
  { id:49, name:"Divine Vitthal Rukmini Idol – VR5", cat:"Idol",img:"https://divinecreationsgift.com/media/shop-72/product-divine-vitthal-rukmini-idol-vr5/divine-vitthal-rukmini-idol-vr5-01e9c5.jpg", badge:"", badgeLabel:"", stars:"4.8", reviews:"(220)", desc:"Bring home the sacred blessings of Lord Vitthal and Goddess Rukmini, revered symbols of devotion, compassion, and spiritual harmony. The Divine Vitthal Rukmini Idol (VR5) is thoughtfully designed with fine detailing that reflects traditional artistry and deep spiritual significance." },
];
const NEW_ARRIVALS = PRODUCTS.filter(p => p.badge === 'new');


// ---- STATE ----
let cart = JSON.parse(localStorage.getItem('vasudha_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('vasudha_wishlist') || '[]');
let currentFilter = 'all';
let visibleCount = 8;
let currentQV = null;
let qvQty = 1;
let currentSlide = 0;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initSlider();
  initDrawers();
  initFilters();
  renderProducts();
  renderNewArrivals();
  updateCartUI();
  updateWishlistUI();
  initScrollAnimations();
  initBackTop();
  initSearch();
});

// ---- LOADER ----
function initLoader() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
}
function filterByCategory(cat) {
  currentFilter = cat;
  visibleCount = 8;

  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });

  renderProducts();
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

// ---- NAVBAR ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    navbar.classList.toggle('scrolled', s > 10);
    navbar.classList.toggle('at-top', s < 10);
    if (s < 10) navbar.classList.add('at-top');
    else navbar.classList.remove('at-top');
    lastScroll = s;
  });
  navbar.classList.add('at-top');

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('open');
    document.getElementById('mobileOverlay').classList.add('active');
  });
  document.getElementById('closeMenu').addEventListener('click', closeMobileMenu);
  document.getElementById('mobileOverlay').addEventListener('click', closeMobileMenu);
  
  // Close mobile menu only for regular links, not dropdown toggles
  document.querySelectorAll('.mobile-link').forEach(l => {
    // Skip dropdown toggle links - they handle their own behavior
    if (!l.closest('.has-dropdown') || l.closest('.has-dropdown').querySelector('.dropdown').contains(l)) {
      l.addEventListener('click', closeMobileMenu);
    }
  });

  // Mobile dropdown click functionality
  initMobileDropdown();
}

function initMobileDropdown() {
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  if (dropdownItems.length === 0) return;

  dropdownItems.forEach(dropdownItem => {
    const dropdownTrigger = dropdownItem.querySelector('a');
    const dropdownContent = dropdownItem.querySelector('.dropdown');
    
    if (!dropdownTrigger || !dropdownContent) return;

    dropdownTrigger.addEventListener('click', function(e) {
      if (window.innerWidth > 768) {
        // Desktop: do absolutely nothing. CSS hover handles everything.
        return; 
      }
      
      // Mobile: prevent navigation and handle the manual accordion toggle
      e.preventDefault();
      
      // Close other dropdowns to keep only one open
      dropdownItems.forEach(other => {
        if (other !== dropdownItem) {
          other.classList.remove('active');
        }
      });
      
      // Toggle current
      dropdownItem.classList.toggle('active');
    });

    // Close when a sub-item category link is clicked
    dropdownContent.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdownItem.classList.remove('active');
        if (dropdownItem.closest('#mobileMenu')) {
          closeMobileMenu();
        }
      });
    });
  });

  // Clicking anywhere outside closes the active dropdown on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth > 768) return;
    
    dropdownItems.forEach(dropdownItem => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('active');
      }
    });
  });
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('active');
}

// ---- HERO SLIDER ----
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');

  function goTo(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  document.querySelector('.slide-next').addEventListener('click', () => goTo(currentSlide + 1));
  document.querySelector('.slide-prev').addEventListener('click', () => goTo(currentSlide - 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.slide)));
  setInterval(() => goTo(currentSlide + 1), 5000);
}

// ---- DRAWERS ----
function initDrawers() {
  // Cart
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);

  // Wishlist
  document.getElementById('wishlistToggle').addEventListener('click', openWishlist);
  document.getElementById('closeWishlist').addEventListener('click', closeWishlist);
  document.getElementById('wishlistOverlay').addEventListener('click', closeWishlist);

  // Quick View
  document.getElementById('closeQuickView').addEventListener('click', closeQuickView);
  document.getElementById('quickViewOverlay').addEventListener('click', e => {
    if(e.target === document.getElementById('quickViewOverlay')) closeQuickView();
  });
}
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
}
function openWishlist() {
  document.getElementById('wishlistDrawer').classList.add('open');
  document.getElementById('wishlistOverlay').classList.add('active');
}
function closeWishlist() {
  document.getElementById('wishlistDrawer').classList.remove('open');
  document.getElementById('wishlistOverlay').classList.remove('active');
}
function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  currentQV = p; 
  qvQty = 1;

  document.getElementById('qvImg').src = p.img;
  document.getElementById('qvImg').alt = p.name;
  document.getElementById('qvCategory').textContent = p.cat.charAt(0).toUpperCase() + p.cat.slice(1);
  document.getElementById('qvName').textContent = p.name;
  document.getElementById('qvReviews').textContent = p.reviews;

  // ✅ PRICE SAFE CHECK
  const priceBox = document.getElementById('qvPrice');
  const oldBox = document.getElementById('qvOld');
  const discBox = document.getElementById('qvDisc');

  if (p.price) {
    priceBox.textContent = `₹${p.price.toLocaleString()}`;
    priceBox.style.display = 'inline';
  } else {
    priceBox.style.display = 'none';
  }

  // ✅ OLD PRICE + DISCOUNT SAFE
  if (p.old && p.price) {
    oldBox.textContent = `₹${p.old.toLocaleString()}`;
    oldBox.style.display = 'inline';

    const disc = Math.round((1 - p.price / p.old) * 100);
    discBox.textContent = `-${disc}%`;
    discBox.style.display = 'inline';
  } else {
    oldBox.style.display = 'none';
    discBox.style.display = 'none';
  }

  document.getElementById('qvDesc').textContent = p.desc;
  document.getElementById('qvQty').textContent = qvQty;

  const badge = document.getElementById('qvBadge');
  if (p.badge) {
    badge.textContent = p.badgeLabel;
    badge.className = `product-badge badge-${p.badge}`;
  } else {
    badge.className = 'product-badge';
    badge.textContent = '';
  }

  const inWish = wishlist.some(w => w.id === p.id);
  document.getElementById('qvWish').textContent = inWish ? '♥ Wishlisted' : '♡ Wishlist';

  document.getElementById('qvAddCart').onclick = () => { addToCart(p, qvQty); closeQuickView(); };
  document.getElementById('qvWish').onclick = () => { toggleWishlist(p); closeQuickView(); };

  document.getElementById('quickViewOverlay').style.display = 'flex';
}
function closeQuickView() {
  document.getElementById('quickViewOverlay').style.display = 'none';
}
function changeQty(delta) {
  qvQty = Math.max(1, qvQty + delta);
  document.getElementById('qvQty').textContent = qvQty;
}

// ---- FILTERS ----
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.cat;
      visibleCount = 8;
      renderProducts();
    });
  });
}
function filterByCategory(cat) {
  currentFilter = cat;
  visibleCount = 8;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  renderProducts();
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

// ---- RENDER PRODUCTS ----
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = currentFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === currentFilter);
  const shown = filtered.slice(0, visibleCount);
  grid.innerHTML = shown.map(productCard).join('');
  document.getElementById('loadMoreBtn').style.display = shown.length < filtered.length ? 'inline-flex' : 'none';
}
function renderNewArrivals() {
  document.getElementById('newArrivalsGrid').innerHTML = NEW_ARRIVALS.map(productCard).join('');
}
function loadMore() {
  visibleCount += 4;
  renderProducts();
}

function productCard(p) {
  const inWish = wishlist.some(w => w.id === p.id);

  return `
    <div class="product-card fade-in">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badgeLabel}</span>` : ''}
        
        <div class="product-actions">
          <button class="add-cart-btn" onclick="addToCart(${JSON.stringify(p).replace(/"/g,'&quot;')}, 1)">Add to Cart</button>
          <button class="quick-view-btn" onclick="openQuickView(${p.id})">👁</button>
          <button class="wish-btn ${inWish ? 'active' : ''}" onclick="toggleWishlist(${JSON.stringify(p).replace(/"/g,'&quot;')})">♡</button>
        </div>
      </div>

      <div class="product-info">
        <p class="product-cat">${p.cat}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-stars">★★★★★ <span>${p.reviews}</span></div>

        ${
          (p.price !== undefined && p.price !== null)
          ? `
          <div class="product-pricing">
            <span class="price-now">₹${p.price.toLocaleString()}</span>
            ${
              (p.old && p.old > p.price)
              ? `<span class="price-old">₹${p.old.toLocaleString()}</span>
                 <span class="price-disc">-${Math.round((1 - p.price / p.old) * 100)}%</span>`
              : ''
            }
          </div>
          `
          : ''
        }

      </div>
    </div>
  `;
}


// ---- CART ----
function addToCart(p, qty) {
  const existing = cart.find(i => i.id === p.id);
  if (existing) { existing.qty += qty; }
  else { cart.push({ ...p, qty }); }
  saveCart();
  updateCartUI();
  renderCartItems();
  openCart();
  showToast(`"${p.name}" added to cart!`);
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
}
function changeCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartItems();
}
function saveCart() {
  localStorage.setItem('vasudha_cart', JSON.stringify(cart));
}
function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = total;
  document.getElementById('cartCount').textContent = `(${total})`;
  renderCartItems();
}
function renderCartItems() {
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    el.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg><p>Your cart is empty</p><a href="#shop" class="btn-gold btn-sm" onclick="closeCart()">Start Shopping</a></div>`;
    footer.style.display = 'none';
    return;
  }
  const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
  el.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.img}" alt="${i.name}" loading="lazy"/>
      <div class="cart-item-info">
        <h4>${i.name}</h4>
        <p class="product-cat">${i.cat}</p>
        <p class="cart-item-price">₹${(i.price * i.qty).toLocaleString()}</p>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="changeCartQty(${i.id},-1)">−</button>
          <span class="qty-display">${i.qty}</span>
          <button class="qty-btn" onclick="changeCartQty(${i.id},1)">+</button>
          <button class="remove-item" onclick="removeFromCart(${i.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
  footer.style.display = 'block';
  document.getElementById('cartTotal').textContent = `₹${subtotal.toLocaleString()}`;
}

// ---- WISHLIST ----
function toggleWishlist(p) {
  const idx = wishlist.findIndex(w => w.id === p.id);
  if (idx >= 0) {
    wishlist.splice(idx, 1);
    showToast(`Removed from wishlist`);
  } else {
    wishlist.push(p);
    showToast(`"${p.name}" added to wishlist!`);
  }
  localStorage.setItem('vasudha_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
  renderNewArrivals();
}
function updateWishlistUI() {
  document.getElementById('wishlistBadge').textContent = wishlist.length;
  const el = document.getElementById('wishlistItems');
  if (!wishlist.length) {
    el.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><p>No items in wishlist</p></div>`;
    return;
  }
  el.innerHTML = wishlist.map(i => `
    <div class="cart-item">
      <img src="${i.img}" alt="${i.name}" loading="lazy"/>
      <div class="cart-item-info">
        <h4>${i.name}</h4>
        <p class="cart-item-price">₹${i.price.toLocaleString()}</p>
        <div class="cart-item-actions">
          <button class="qty-btn" style="width:auto;padding:4px 12px;border-radius:2px;" onclick="addToCart(${JSON.stringify(i).replace(/"/g,'&quot;')},1);closeWishlist()">Add to Cart</button>
          <button class="remove-item" onclick="toggleWishlist(${JSON.stringify(i).replace(/"/g,'&quot;')})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ---- CHECKOUT ----
function showCheckout() {
  closeCart();
  const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('checkoutItems').innerHTML = cart.map(i =>
    `<div class="summary-row"><span>${i.name} ×${i.qty}</span><span>₹${(i.price*i.qty).toLocaleString()}</span></div>`
  ).join('');
  document.getElementById('checkoutSubtotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('checkoutTotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('checkoutOverlay').style.display = 'flex';
}
function placeOrder() {
  document.getElementById('checkoutOverlay').style.display = 'none';
  document.getElementById('orderSuccess').style.display = 'flex';
  cart = []; saveCart(); updateCartUI();
}
function closeOrder() {
  document.getElementById('orderSuccess').style.display = 'none';
}

// ---- SEARCH ----
function initSearch() {
  document.getElementById('searchToggle').addEventListener('click', () => {
    document.getElementById('searchOverlay').classList.add('active');
    setTimeout(() => document.getElementById('searchInput').focus(), 300);
  });
  document.getElementById('closeSearch').addEventListener('click', () => {
    document.getElementById('searchOverlay').classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('searchOverlay').classList.remove('active');
      document.getElementById('quickViewOverlay').style.display = 'none';
    }
  });
  document.querySelectorAll('.search-suggestions span').forEach(s => {
    s.addEventListener('click', () => {
      document.getElementById('searchInput').value = s.textContent;
      document.getElementById('searchOverlay').classList.remove('active');
      document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ---- CONTACT FORM ----
function submitContact(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
  setTimeout(() => {
    document.getElementById('contactForm').reset();
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
  }, 4000);
}

// ---- NEWSLETTER ----
function subscribeNL() {
  const email = document.getElementById('nlEmail').value;
  if (!email || !email.includes('@')) { showToast('Please enter a valid email!'); return; }
  showToast('🎉 You\'re subscribed! Welcome to the Vasudha Circle.');
  document.getElementById('nlEmail').value = '';
}

// ---- TOAST ----
let toastTimeout;
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `
      position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);
      background:#1A1714;color:#fff;padding:12px 24px;border-radius:4px;
      font-size:0.85rem;z-index:9000;opacity:0;transition:all 0.3s ease;
      white-space:nowrap;max-width:90vw;text-align:center;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2800);
}

// ---- SCROLL ANIMATIONS ----
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function observeAll() {
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }
  observeAll();
  const mutObs = new MutationObserver(observeAll);
  mutObs.observe(document.getElementById('productsGrid'), { childList: true });
  mutObs.observe(document.getElementById('newArrivalsGrid'), { childList: true });
}

// ---- BACK TO TOP ----
function initBackTop() {
  const btn = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---- STATIC PAGES ----
const PAGES = {
  privacy: `
    <h2>Privacy Policy</h2>
    <p>Last updated: January 2025</p>
    <h3>1. Information We Collect</h3>
    <p>We collect information you provide when making purchases, creating accounts, or contacting us. This includes name, email, address, and payment details.</p>
    <h3>2. How We Use Your Information</h3>
    <p>Your information is used to process orders, send updates, personalise your experience, and improve our services. We never sell your data to third parties.</p>
    <h3>3. Data Security</h3>
    <p>All transactions are SSL encrypted. We use industry-standard security measures to protect your personal information.</p>
    <h3>4. Cookies</h3>
    <p>We use cookies to enhance your browsing experience. You may disable cookies in your browser settings.</p>
    <h3>5. Contact</h3>
    <p>For privacy-related queries, email us at privacy@vasudha.store</p>
  `,
  terms: `
    <h2>Terms & Conditions</h2>
    <p>Last updated: January 2025</p>
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing or using Vasudha's website, you agree to be bound by these Terms and Conditions.</p>
    <h3>2. Products & Pricing</h3>
    <p>All prices are in Indian Rupees (₹) and inclusive of GST. We reserve the right to change prices without notice.</p>
    <h3>3. Orders & Payments</h3>
    <p>Orders are confirmed upon payment. We accept UPI, credit/debit cards, and Cash on Delivery (COD).</p>
    <h3>4. Shipping Policy</h3>
    <p>Free shipping on orders above ₹999. Standard delivery takes 5–7 business days. Express delivery is available at extra cost.</p>
    <h3>5. Returns & Refunds</h3>
    <p>We accept returns within 7 days of delivery for damaged or incorrect items. Customised items are non-returnable.</p>
    <h3>6. Intellectual Property</h3>
    <p>All content on this website is the property of Vasudha and may not be reproduced without permission.</p>
  `
};
function showPage(key) {
  document.getElementById('pageModalContent').innerHTML = PAGES[key] || '';
  document.getElementById('pageModal').style.display = 'flex';
}