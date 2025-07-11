// ULTRA KEITH PERSONAS DATABASE
// All 85 personas (1984-2023)
// Just add new personas to this array - that's it!

var PERSONAS_DATABASE = [
    // 1984
    {
        number: "001", 
        name: "Activity", 
        year: "1984", 
        era: "old", 
        age: "20 (young breakdancer age)", 
        origin: "NYC",
        likes: "Breakdancing, popping and rocking", 
        dislikes: "Sitting still, slow music",
        quote: "I Pop it like that, Rock it like that...",
        biography: "Keith's first documented persona from the NYC Breakers breakdancing crew. Activity represents the foundation of Keith's character creation, emerging from early hip-hop culture before rap dominated.",
        debut: "NYC Breakers (1984) - Pre-rap career", 
        themes: "Breakdancing culture, early hip-hop foundation, character creation origins",
        image: "activity.jpg"
    },
    
    // 1988
    {
        number: "002", 
        name: "Kool Keith", 
        year: "1988", 
        era: "old", 
        age: "25", 
        origin: "Bronx, NY",
        likes: "Porn, Animals", 
        dislikes: "Girls who are not innovative that don't like to take pictures",
        quote: "I'm the master of the game, all the girls know my name.",
        biography: "Keith's primary rap persona. The revolutionary MC who broke all rules with abstract wordplay, sci-fi concepts, and unconventional rhyme patterns that influenced generations.",
        debut: "Critical Beatdown (1988) with Ultramagnetic MCs", 
        themes: "Complex rhymes, abstract imagery, sci-fi concepts, innovative flow",
        image: "koolkeith.jpg"
    },
    
    {
        number: "003", 
        name: "MC Ultra", 
        year: "1988", 
        era: "old", 
        age: "24 (pre-Kool Keith maturity)", 
        origin: "Bronx",
        likes: "Echo chambers, reverb effects, early sampling", 
        dislikes: "Wack MCs, digital delays",
        quote: "MC Ultra sound, echo through your town...",
        biography: "Early Bronx-based persona representing Keith's foundational MC identity during the late 1980s Ultramagnetic era.",
        debut: "Late 1980s (Ultramagnetic era)", 
        themes: "Bronx identity, early MC development, Ultramagnetic foundation",
        image: "mcultra.jpg"
    },
    
    {
        number: "004", 
        name: "Dr. Sperm", 
        year: "1988", 
        era: "old", 
        age: "32 (medical school graduate age)", 
        origin: "Laboratory test tube",
        likes: "Early rap experimentation, reproductive science, petri dishes", 
        dislikes: "Birth control, sterile environments",
        quote: "Dr. Sperm in the house, making life from scratch...",
        biography: "One of Keith's earliest aliases representing his experimental approach to rap persona development and foreshadowing his later medical-themed characters.",
        debut: "Early career alias (1988)", 
        themes: "Early rap identity, medical theme precursor, experimental persona development",
        image: "drsperm.jpg"
    },
    
    // 1989
    {
        number: "005", 
        name: "Exotron Geiger Counter One Plus Megatron", 
        year: "1989", 
        era: "old", 
        age: "10,000 (robot years)", 
        origin: "Cybertron (Scientific laboratory division)",
        likes: "Complex scientific names, radio appearances, Megatron references, radiation detection", 
        dislikes: "Simple identities, Autobots",
        quote: "Exotron readings off the meter, Geiger Counter be the leader...",
        biography: "Keith's experimental radio persona combining scientific complexity with Transformers references. Represents early character experimentation on Marley Marl's influential radio show.",
        debut: "Marley Marl In Control radio show (1989), Critical Beatdown (1988)", 
        themes: "Scientific complexity, Transformers reference, radio culture, early experimentation",
        image: "exotron.jpg"
    },
    
    {
        number: "006", 
        name: "Exotron Geiger Counter One Gamma Plus Sequencer", 
        year: "1989", 
        era: "old", 
        age: "10,001 (upgraded model)", 
        origin: "Cybertron (Advanced Scientific Division)",
        likes: "Complex scientific names, radio appearances, sequencer technology, gamma radiation", 
        dislikes: "Simple identities, analog equipment",
        quote: "Gamma sequences activate, Exotron don't hesitate...",
        biography: "Extended version of Keith's scientific radio persona, emphasizing sequencer technology and complex naming conventions that became his trademark.",
        debut: "Marley Marl In Control radio show (1989) - longer version", 
        themes: "Scientific complexity, sequencer technology, radio experimentation",
        image: "exotron-gamma.jpg"
    },
    
    // 1995
    {
        number: "007", 
        name: "Big Willie Smith", 
        year: "1995", 
        era: "old", 
        age: "22", 
        origin: "Uptown",
        likes: "Blondes, Cold Duck, big status, Beat Terrorists", 
        dislikes: "Landlords, Antennas",
        quote: "Keep it real, represent what? My nuts!...",
        biography: "Keith's street credibility persona from his Beat Terrorists EP era, representing raw uptown attitude and early independent releases before major label success.",
        debut: "Big Willie Smith EP (1995) with Beat Terrorists", 
        themes: "Street credibility, representing, early EP work, independent releases",
        image: "bigwilliesmith.jpg"
    },
    
    {
        number: "008", 
        name: "X-74", 
        year: "1995", 
        era: "old", 
        age: "74 (the number in his name)", 
        origin: "Cenobite dimension",
        likes: "Dope verses, mathematical equations, X-variables", 
        dislikes: "Wack rhymes, solved equations",
        quote: "X marks the spot where the dope verse drops...",
        biography: "Keith's Cenobites collaboration persona, exploring abstract rhyming and philosophical concepts within the underground collective's experimental approach.",
        debut: "Cenobites EP - Kick a Dope Verse (1995)", 
        themes: "Abstract rhyming, cenobite philosophy, underground collaboration",
        image: "x74.jpg"
    },
    
    // 1992
    {
        number: "009", 
        name: "Poppa Large", 
        year: "1992", 
        era: "old", 
        age: "35", 
        origin: "Bronx, NY",
        likes: "Daredevil videos, Spinning around in circles", 
        dislikes: "Quicksand, Soft Pretzels",
        quote: "I'm Poppa Large, Big Shot On The East Coast",
        biography: "Keith's East Coast supremacy persona, emphasizing regional pride and daredevil attitude during Ultramagnetic's funk era expansion.",
        debut: "Funk Your Head Up (1992) with Ultramagnetic MCs", 
        themes: "East Coast supremacy, braggadocio, daredevil attitude",
        image: "poppalarge.jpg"
    },
    
    {
        number: "010", 
        name: "Rhythm X", 
        year: "1992", 
        era: "old", 
        age: "30", 
        origin: "BX, New York",
        likes: "Mae West, Gastronomy", 
        dislikes: "Traffic, Soft Cauliflower",
        quote: "Rhythm X roller, my style gets critical, Brain connects, computer rhymes get physical.",
        biography: "Keith's rhythmic complexity persona, combining abstract wordplay with culinary interests and classic Hollywood references, later featured by The Prodigy.",
        debut: "Funk Your Head Up (1992) with Ultramagnetic MCs - Funk Radio", 
        themes: "Rhythmic complexity, abstract wordplay, gastronomy, crossover appeal",
        image: "rhythmx.jpg"
    },
    
    {
        number: "011", 
        name: "The X", 
        year: "1992", 
        era: "mid", 
        age: "Infinite (X equals infinity)", 
        origin: "Algebraic dimension",
        likes: "Four Horsemen imagery, mathematical mysteries", 
        dislikes: "Being solved, simple equations",
        quote: "I'm the X factor, mathematical reactor...",
        biography: "Mysterious X-identity connected to Ultramagnetic's Four Horsemen concept, representing Keith's exploration of apocalyptic and biblical themes.",
        debut: "Ultramagnetic MC's Four Horsemen LP (inside cover) (1992)", 
        themes: "X-identity, Ultramagnetic era, apocalyptic imagery",
        image: "thex.jpg"
    },
    
    {
        number: "012", 
        name: "X-Caliber", 
        year: "1992", 
        era: "mid", 
        age: "1000 (medieval sword age)", 
        origin: "Stone (where Arthur pulled the sword)",
        likes: "Funk radio, sword imagery, medieval combat", 
        dislikes: "Rust, modern weapons",
        quote: "X-Caliber slice through funk like butter...",
        biography: "Sword-themed persona combining medieval weaponry with funk radio culture, representing Keith's ability to blend historical references with contemporary hip-hop.",
        debut: "Funk Your Head Up (1992) - Funk Radio", 
        themes: "Sword/weapon imagery, funk radio culture, medieval hip-hop fusion",
        image: "xcaliber.jpg"
    },
    
    {
        number: "013", 
        name: "The Fourth Horseman", 
        year: "1992", 
        era: "mid",
        age: "Eternal (apocalyptic being)", 
        origin: "Apocalyptic realm",
        likes: "Apocalyptic themes, horsemen mythology, ending worlds", 
        dislikes: "Peace, happy endings",
        quote: "Fourth Horseman riding, apocalypse providing...",
        biography: "Keith's apocalyptic persona connected to biblical Four Horsemen imagery, representing his exploration of religious and mythological themes within hip-hop.",
        debut: "Ultramagnetic MC's Four Horsemen LP (1992)", 
        themes: "Apocalyptic imagery, biblical references, horsemen mythology",
        image: "fourthorseman.jpg"
    },
    
    {
        number: "014", 
        name: "Funk Igniter Plus", 
        year: "1992", 
        era: "mid",
        age: "28 (funk prime age)", 
        origin: "The funk dimension",
        likes: "Funk radio, igniting funk, bass lines", 
        dislikes: "Non-funk music, disco",
        quote: "Funk Igniter Plus, set the bass on fire...",
        biography: "Keith's funk radio persona dedicated to igniting and spreading funk music culture throughout the hip-hop community and beyond.",
        debut: "Funk Your Head Up (1992) - Funk Radio", 
        themes: "Funk music, radio culture, funk ignition",
        image: "funkigniter.jpg"
    },
    
    // 1993
    {
        number: "015", 
        name: "Dr. Octagon", 
        year: "1993", 
        era: "classic",
        age: "Deceased", 
        origin: "Jupiter",
        likes: "n/a", 
        dislikes: "n/a",
        quote: "No please, don't shoot!",
        biography: "Keith's most famous persona - an alien surgeon from Jupiter performing bizarre medical procedures. First created for unreleased Smoking Dust track, later revolutionized underground hip-hop.",
        debut: "First appeared on unreleased Smoking Dust (1993), released on Dr. Octagonecologyst (1996)", 
        themes: "Bizarre medical procedures, space travel, sexual encounters with patients, underground hip-hop revolution",
        image: "droctagon.jpg"
    },
    
    // 1995
    {
        number: "016", 
        name: "Professor Planetory", 
        year: "1995", 
        era: "mid",
        age: "55 (professor emeritus age)", 
        origin: "Space University (Academic space setting)",
        likes: "Experimental production, planetary studies", 
        dislikes: "Conventional beats, Earth-based music",
        quote: "Professor Planetory, beats from the observatory...",
        biography: "Keith's academic production persona combining professorial themes with planetary concepts for experimental beat creation.",
        debut: "Production alias (1995)", 
        themes: "Experimental production, planetary concepts, academic themes, beat innovation",
        image: "professorplanetory.jpg"
    },
    
    // 1996
    {
        number: "017", 
        name: "Mr. Gerbik", 
        year: "1996", 
        era: "classic",
        age: "208", 
        origin: "Jupiter",
        likes: "Fishing, Swimming", 
        dislikes: "Wolfmen, Flossing",
        quote: "Skin like alligator, carrying a dead walrus.",
        biography: "Keith's half-shark/half-man hybrid persona from the Dr. Octagon universe. A 208-year-old genetic mutation that became a fan favorite and is featured in the 2025 CZARFACE graphic novel.",
        debut: "Dr. Octagonecologyst (1996) - Halfsharkalligatorhalfman", 
        themes: "Half-shark/half-man hybrid, genetic mutation, oceanic predator, Dr. Octagon universe",
        image: "mrgerbik.jpg"
    },
    
    {
        number: "018", 
        name: "Shark Man", 
        year: "1996", 
        era: "classic",
        age: "208", 
        origin: "Jupiter",
        likes: "Shark behavior, oceanic hunting, blood in water", 
        dislikes: "Land creatures, swimming pools",
        quote: "Half shark, half man, all predator...",
        biography: "Alternate identity for Mr. Gerbik emphasizing pure shark characteristics and oceanic predator instincts within the Dr. Octagon multiverse.",
        debut: "Dr. Octagonecologyst (1996) - alternate name for Mr. Gerbik", 
        themes: "Pure shark identity, oceanic predator, Dr. Octagon universe",
        image: "sharkman.jpg"
    },
    
    {
        number: "019", 
        name: "Mr. Green", 
        year: "1996", 
        era: "classic",
        age: "259", 
        origin: "Zzyzx",
        likes: "Big money strip clubs, Wells Fargo, Bank Of America", 
        dislikes: "Purple",
        quote: "Being green is easy for me.",
        biography: "Keith's money-focused persona with banking themes and green aesthetic, representing financial success and monetary obsessions.",
        debut: "Ultra - Big Time album back cover (1996)", 
        themes: "Money, banking, green aesthetic, financial success",
        image: "mrgreen.jpg"
    },
    
    {
        number: "020", 
        name: "Reverend Tom", 
        year: "1996", 
        era: "classic",
        age: "67", 
        origin: "L.A.",
        likes: "Lingerie, Politics", 
        dislikes: "People who don't put money in church baskets",
        quote: "You best to kneel and let the Reverend heal you.",
        biography: "Keith's corrupt preacher persona combining religious themes with horror elements, later featured prominently in Thee Undatakerz project.",
        debut: "Ultra - Big Time Fat Lady track (1996), Thee Undatakerz (2004)", 
        themes: "Horror sermons, death, morgues, corrupt religion",
        image: "reverendtom.jpg"
    },
    
    {
        number: "021", 
        name: "Elephant Man", 
        year: "1996", 
        era: "classic",
        age: "27 (Joseph Merrick's age when he died)", 
        origin: "Victorian London (freak show circuit)",
        likes: "Planned album releases, David Lynch films", 
        dislikes: "Delays, unreleased projects",
        quote: "slash fan, half of y'all think I'm the Elephant Man",
        biography: "Keith's unreleased project persona with David Lynch film reference, representing planned but never realized album concepts from the late 1990s.",
        debut: "Planned project (1996-1998) never released", 
        themes: "Elephant imagery, David Lynch reference, unreleased projects, planned concepts",
        image: "elephantman.jpg"
    },
    
    {
        number: "022", 
        name: "MC Baldylocks", 
        year: "1996", 
        era: "classic",
        age: "50 (bald and proud age)", 
        origin: "The barbershop (final cut)",
        likes: "Bald pride, head shine, Rogaine failures", 
        dislikes: "Hair plugs, toupees",
        quote: "No hair don't care, MC Baldylocks in the air...",
        biography: "Keith's bald-themed persona with fairy tale reference, representing his playful approach to self-image and fairy tale parody.",
        debut: "Mid-1990s persona catalog (1996)", 
        themes: "Bald imagery, fairy tale reference, self-image play, parody",
        image: "mcbaldylocks.jpg"
    },
    
    {
        number: "023", 
        name: "Tommy Ellis", 
        year: "1996", 
        era: "classic",
        age: "40 (fashion mogul age)", 
        origin: "Fashion industry",
        likes: "Tommy Hilfiger, Perry Ellis brands, designer labels", 
        dislikes: "Non-designer fashion, knockoffs",
        quote: "Tommy Ellis, fashion relentless, style so expensive...",
        biography: "Keith's fashion brand parody persona combining Tommy Hilfiger and Perry Ellis references to critique consumer fashion culture.",
        debut: "Fashion parody persona development (1996)", 
        themes: "Fashion brand parody, consumer culture satire, designer fashion critique",
        image: "tommyellis.jpg"
    },
    
    // 1997
    {
        number: "024", 
        name: "Willie Biggs", 
        year: "1997", 
        era: "classic",
        age: "22", 
        origin: "Uptown",
        likes: "Blondes, Cold Duck", 
        dislikes: "Landlords, Antennas",
        quote: "Keep it real, represent what? My nuts!",
        biography: "Evolution of Big Willie Smith for the Sex Style era, representing street credibility and the Willie Biggs persona network that includes multiple character identities.",
        debut: "Sex Style - Still The Best (1997)", 
        themes: "Street credibility, representing, persona network evolution",
        image: "williebiggs.jpg"
    },
    
    {
        number: "025", 
        name: "Joe Kingpin", 
        year: "1997", 
        era: "classic",
        age: "35 (kingpin status age)", 
        origin: "The streets (penthouse level)",
        likes: "Big stacks, money, kingpin status, counting bills", 
        dislikes: "Competition, broke people",
        quote: "Joe Kingpin, big stack, money Willie Biggs",
        biography: "Money-focused persona within the Willie Biggs network, representing Keith's exploration of kingpin mentality and financial success themes.",
        debut: "Sex Style - Still The Best (1997)", 
        themes: "Kingpin status, money, power, Willie Biggs network",
        image: "joekingpin.jpg"
    },
    
    {
        number: "026", 
        name: "Frankie Joe", 
        year: "1997", 
        era: "classic",
        age: "38 (trucker veteran)", 
        origin: "Down South",
        likes: "Southern lifestyle, pushing rigs, truck stop diners", 
        dislikes: "Traffic jams, weigh stations",
        quote: "down south, they call me Frankie Joe",
        biography: "Keith's Southern trucking persona within the Willie Biggs network, representing Southern identity and trucking culture.",
        debut: "Sex Style - Still The Best (1997)", 
        themes: "Southern identity, trucking, Willie Biggs network, regional representation",
        image: "frankiejoe.jpg"
    },
    
    {
        number: "027", 
        name: "Texas Swift", 
        year: "1997", 
        era: "classic",
        age: "29 (young and fast)", 
        origin: "Texas",
        likes: "Swift movement, Texas pride, speed limits as suggestions", 
        dislikes: "Slow competitors, Oklahoma",
        quote: "I'm Texas Swift",
        biography: "Keith's Texas speed persona within the Willie Biggs network, representing regional Texas identity and swift movement.",
        debut: "Sex Style - Still The Best (1997)", 
        themes: "Texas identity, speed, swiftness, Willie Biggs network",
        image: "texasswift.jpg"
    },
    
    {
        number: "028", 
        name: "Jay Gloom", 
        year: "1997", 
        era: "classic",
        age: "33 (street veteran)", 
        origin: "The streets",
        likes: "Walking streets, gloom atmosphere, rainy days", 
        dislikes: "Bright optimism, sunshine",
        quote: "Im jay gloom, on the streets, still walkin doo doo",
        biography: "Keith's dark street persona within the Willie Biggs network, representing gloomy urban atmosphere and street walking.",
        debut: "Sex Style - Still The Best (1997)", 
        themes: "Dark street persona, gloom imagery, urban atmosphere, street culture",
        image: "jaygloom.jpg"
    },
    
    {
        number: "029", 
        name: "Masquerade Man", 
        year: "1997", 
        era: "classic",
        age: "31 (mysterious prime)", 
        origin: "Behind the mask",
        likes: "Masks, being ill, spinning reel to reel, costume parties", 
        dislikes: "Revealing identity, digital recording",
        quote: "Masquerade man is ill, Keith spinnin reel to reel",
        biography: "Keith's masked identity persona within the Willie Biggs network, representing hidden identity and DJ skills with reel-to-reel equipment.",
        debut: "Sex Style - Still The Best (1997)", 
        themes: "Masked identity, DJ skills, hidden persona, reel-to-reel equipment",
        image: "masquerademan.jpg"
    },
    
    {
        number: "030", 
        name: "Elvin Presley", 
        year: "1997", 
        era: "classic",
        age: "77 (if Elvis lived)", 
        origin: "Graceland (art department)",
        likes: "Concert promotion, artwork, collector cards, peanut butter", 
        dislikes: "Impersonators, bad artwork",
        quote: "Thank you, thank you very much... for collecting...",
        biography: "Keith's Elvis parody persona appearing only in promotional artwork and collector cards, representing his playful approach to iconic imagery.",
        debut: "Concert promotional cards (1997)", 
        themes: "Elvis parody, promotional material, collector culture, iconic imagery",
        image: "elvinpresley.jpg"
    },
    
    {
        number: "031", 
        name: "Exxon", 
        year: "1997", 
        era: "classic",
        age: "150 (oil company age)", 
        origin: "Oil refinery",
        likes: "Oil industry, concert promotion, collector cards, gas prices", 
        dislikes: "Electric cars, environmental protesters",
        quote: "Put a tiger in your tank, put Keith in your brain...",
        biography: "Keith's oil industry reference persona from promotional concert cards, representing corporate imagery and energy sector themes.",
        debut: "Concert promotional cards (1997)", 
        themes: "Oil/gas industry reference, corporate imagery, promotional material",
        image: "exxon.jpg"
    },
    
    // 1998
    {
        number: "032", 
        name: "Captain Kool", 
        year: "1998", 
        era: "classic",
        age: "45 (military captain age)", 
        origin: "Military academy (cool division)",
        likes: "Military command, kool aesthetic, strategic warfare", 
        dislikes: "Hot weather, uncool soldiers",
        quote: "Captain Kool commanding the ice-cold troops...",
        biography: "Planned military command persona that may not have been fully utilized, representing Keith's exploration of authority themes.",
        debut: "Planned alias (1998) according to Liveonerecords.com", 
        themes: "Military leadership, cool command, authority exploration",
        image: "captainkool.jpg"
    },
    
    {
        number: "033", 
        name: "Captain Black", 
        year: "1998", 
        era: "classic",
        age: "43 (military leadership age)", 
        origin: "Fort Black (military base)",
        likes: "Military command, black aesthetic, midnight operations", 
        dislikes: "White flags, surrender",
        quote: "Captain Black in the dark, commanding after dark...",
        biography: "Planned military command persona emphasizing black identity themes that may not have been fully developed.",
        debut: "Planned alias (1998) according to Liveonerecords.com", 
        themes: "Military leadership, black identity, command authority",
        image: "captainblack.jpg"
    },
    
    {
        number: "034", 
        name: "The Best MC In The World", 
        year: "1998", 
        era: "classic",
        age: "Timeless (beyond age)", 
        origin: "The top of the rap game",
        likes: "Being the best, eternal recognition", 
        dislikes: "Competition, being questioned",
        quote: "That's just what he is",
        biography: "Keith's ultimate supremacy persona representing his eternal status as the greatest MC, transcending normal persona limitations.",
        debut: "Self-referential claim (1998)", 
        themes: "Ultimate supremacy, eternal status, transcendent identity, MC superiority",
        image: "bestmcintheworld.jpg"
    },
    
    // 1999 - MASSIVE YEAR FOR PERSONAS!
    {
        number: "035", 
        name: "Dr. Dooom", 
        year: "1999", 
        era: "classic",
        age: "24", 
        origin: "New York",
        likes: "Arms, Hamburgers infested with mice, having roaches around", 
        dislikes: "Ox smell, Dept. of Food & Agriculture",
        quote: "I'm a New York psycho buyin' shells in the Hollywood section",
        biography: "Keith's horrorcore persona who famously killed Dr. Octagon. A cannibalistic character representing Keith's darker themes and industry frustrations.",
        debut: "First Come, First Served (1999)", 
        themes: "Murder, cannibalism, horrorcore, killing Dr. Octagon, industry critique",
        image: "drdooom.jpg"
    },
    
    {
        number: "036", 
        name: "Robbie Analog", 
        year: "1999", 
        era: "classic",
        age: "28", 
        origin: "Austin, TX",
        likes: "Vinyl, Cassettes", 
        dislikes: "CD's, DATS, Milk",
        quote: "I don't sample jazz records.",
        biography: "Keith's jab at RZA's Bobby Digital persona, emphasizing analog technology over digital production methods and representing the analog vs. digital debate.",
        debut: "First Come, First Served artwork (1999)", 
        themes: "Analog vs digital technology, producer parody, technology debate",
        image: "robbieanalog.jpg"
    },
    
    {
        number: "037", 
        name: "Black Elvis", 
        year: "1999", 
        era: "classic",
        age: "24", 
        origin: "Memphis, TN",
        likes: "Flashy Cars, Nice Disco Clubs", 
        dislikes: "Evil Twin Dr. Dooom",
        quote: "Black Elvis, Rock Star, Walkin' Down Broadway.",
        biography: "Keith's rock star persona combining Elvis Presley imagery with space travel themes. Represents glamorous lifestyle and futuristic rock star aesthetic. Revived in 2023 with updated modern elements.",
        debut: "Black Elvis/Lost in Space (1999), Revived (2023)", 
        themes: "Space travel, rock star lifestyle, futuristic technology, Elvis tribute",
        image: "blackelvis.jpg"
    },
    
    {
        number: "038", 
        name: "Keith Televasquez", 
        year: "1999", 
        era: "classic",
        age: "42 (detective experience age)", 
        origin: "Miami Vice set",
        likes: "Investigation, Mauri alligators, solving cases", 
        dislikes: "Being static, unsolved mysteries",
        quote: "Unique investigator, sportin Mauri alligators...",
        biography: "Keith's investigative persona combining detective work with luxury fashion, representing his fluid identity transformations and investigative mindset.",
        debut: "Black Elvis/Lost in Space (1999) - Clifton", 
        themes: "Investigation, luxury fashion, persona fluidity, detective work",
        image: "keithtelevasquez.jpg"
    },
    
    {
        number: "039", 
        name: "Keith Turbo", 
        year: "1999", 
        era: "classic",
        age: "1", 
        origin: "Indianapolis, IN",
        likes: "Oil, Racecar driving", 
        dislikes: "Station Wagons",
        quote: "Man, I could throw a 100 pound Walrus through the wall!",
        biography: "Keith's speed-obsessed racing persona, representing automotive culture and futuristic travel within the Black Elvis project universe.",
        debut: "Black Elvis/Lost in Space (1999)", 
        themes: "Speed, automotive, futuristic travel, strength demonstrations",
        image: "keithturbo.jpg"
    },
    
    {
        number: "040", 
        name: "Mr. Orange", 
        year: "1999", 
        era: "classic",
        age: "27 (citrus fresh)", 
        origin: "Orange County (the fruit section)",
        likes: "Livin Astro lifestyle, orange aesthetic, vitamin C", 
        dislikes: "Scurvy, other colors",
        quote: "Orange you glad to see me livin astro...",
        biography: "Video-only persona from the Livin Astro music video, representing Keith's exploration of color-themed identities and astro living concepts.",
        debut: "Livin Astro music video (1999)", 
        themes: "Orange aesthetic, astro living, video persona, color identity",
        image: "mrorange.jpg"
    },
