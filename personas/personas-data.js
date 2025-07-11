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
    
    {
        number: "041", 
        name: "Lonnie Hendrix", 
        year: "1999", 
        era: "classic",
        age: "27 (Hendrix's age when he died)", 
        origin: "Seattle (Hendrix connection)",
        likes: "Livin Astro lifestyle, Hendrix tribute, guitar solos", 
        dislikes: "Cover bands, out-of-tune guitars",
        quote: "Purple haze in space, astro guitar face...",
        biography: "Jimi Hendrix tribute persona from the Livin Astro video, combining guitar legend worship with Keith's astro living aesthetic.",
        debut: "Livin Astro music video (1999)", 
        themes: "Hendrix tribute, astro living, guitar legend worship, video persona",
        image: "lonniehendrix.jpg"
    },
    
    {
        number: "042", 
        name: "Light Blue Cop", 
        year: "1999", 
        era: "classic",
        age: "35 (police academy graduate + experience)", 
        origin: "Police Academy (light blue division)",
        likes: "Law enforcement, astro patrol, light blue uniforms", 
        dislikes: "Dark blue cops, crime in space",
        quote: "Light blue badges, astro law enforcer...",
        biography: "Law enforcement persona from the Livin Astro video, representing authority figures within Keith's astro living universe.",
        debut: "Livin Astro music video (1999)", 
        themes: "Police authority, light blue aesthetic, astro patrol, law enforcement",
        image: "lightbluecop.jpg"
    },
    
    {
        number: "043", 
        name: "The Kid In The Commercial", 
        year: "1999", 
        era: "classic",
        age: "8 (commercial kid age)", 
        origin: "TV Studio (commercial sound stage)",
        likes: "Commercial appearances, residual checks", 
        dislikes: "Auditions, stage parents",
        quote: "Buy this product, I'm just a kid...",
        biography: "Commercial parody persona from the Livin Astro video, resembling Dr. Ultra and representing Keith's critique of commercialization.",
        debut: "Livin Astro music video (1999)", 
        themes: "Commercial parody, Dr. Ultra connection, commercialization critique",
        image: "kidincommercial.jpg"
    },
    
    {
        number: "044", 
        name: "Platinum Rich", 
        year: "1999", 
        era: "classic",
        age: "42 (rich businessman age)", 
        origin: "Platinum mines",
        likes: "Production, diesel engines, platinum aesthetics, expensive chains", 
        dislikes: "Non-diesel vehicles, gold (it's cheaper)",
        quote: "Platinum Rich, diesel thick, production slick...",
        biography: "Producer persona later featured in Diesel Truckers, representing Keith's production skills and luxury aesthetic combined with trucking imagery.",
        debut: "Dr. Dooom (1999) as producer credit, Diesel Truckers (2004)", 
        themes: "Production, trucking imagery, luxury, platinum aesthetic",
        image: "platinumrich.jpg"
    },
    
    {
        number: "045", 
        name: "Sinister 6000", 
        year: "1999", 
        era: "classic",
        age: "7999", 
        origin: "Iceland",
        likes: "Warm, Cuddly Woman", 
        dislikes: "Democracy, Carbon",
        quote: "Sinister 6000 / new styles I be housing.",
        biography: "Keith's futuristic dystopian persona created with Dan the Automator, representing anti-establishment themes and technological evolution.",
        debut: "A Better Tomorrow (Dan the Automator EP, 1999)", 
        themes: "Futuristic dystopia, anti-establishment, technological evolution",
        image: "sinister6000.jpg"
    },
    
    {
        number: "046", 
        name: "Clean Man", 
        year: "1999", 
        era: "classic",
        age: "30", 
        origin: "Comet",
        likes: "Girls Who Are Clean", 
        dislikes: "Grime In Hard To Reach Places",
        quote: "I've come to get rid of grease and knock out tough stains.",
        biography: "Keith's cleanliness-obsessed persona with space origins, representing hygiene themes and cosmic cleaning missions.",
        debut: "Used during HipHopSite.com era (1999)", 
        themes: "Cleanliness, hygiene, space origin, cosmic missions",
        image: "cleanman.jpg"
    },
    
    {
        number: "047", 
        name: "Willie Natural", 
        year: "1999", 
        era: "classic",
        age: "23", 
        origin: "Harlem, NY",
        likes: "Sofa & Loveseat Combo", 
        dislikes: "Strenuous work or exercise",
        quote: "I'm just a natural kinda guy.",
        biography: "Keith's laid-back Harlem persona representing natural lifestyle and relaxed attitude during the HipHopSite.com era.",
        debut: "Used during HipHopSite.com era (1999)", 
        themes: "Laid-back lifestyle, natural approach, Harlem culture, relaxation",
        image: "willienatural.jpg"
    },
    
    {
        number: "048", 
        name: "Fly Ricky: The Wine Taster", 
        year: "1999", 
        era: "classic",
        age: "43", 
        origin: "Miami, FL",
        likes: "Salsa Music, Fine Wines, Mongos", 
        dislikes: "Cheap, Inexpensive Wines, Fake burritos",
        quote: "I did a show with the Gap Band in Miami.",
        biography: "Keith's sophisticated Miami persona combining wine culture with salsa music and R&B connections, representing refined taste and cultural sophistication.",
        debut: "Used during HipHopSite.com era (1999)", 
        themes: "Wine culture, Miami lifestyle, salsa music, cultural sophistication",
        image: "flyrickywinetaster.jpg"
    },
    
    {
        number: "049", 
        name: "Dr. Ultra", 
        year: "1999", 
        era: "classic",
        age: "36 (commercial spokesman age)", 
        origin: "TV Commercial Set (Sprite studio)",
        likes: "Asian authentic wear, Sprite", 
        dislikes: "Deadly women rappers",
        quote: "Female Mc's... They dont have Mic Skills...",
        biography: "Keith's clean commercial persona from Sprite's Five Deadly Venoms campaign, representing mainstream commercial appeal and battle rap themes.",
        debut: "Sprite Commercial (1999) - Five Deadly Venoms series", 
        themes: "Clean commercial image, battle rap, mainstream appeal, brand endorsement",
        image: "drultra.jpg"
    },
    
    {
        number: "050", 
        name: "Rico From Puerto Rico", 
        year: "1999", 
        era: "classic",
        age: "26 (young Latino pride)", 
        origin: "Puerto Rico",
        likes: "Hispanic culture, island life, salsa music", 
        dislikes: "Mainland assumptions, bad Spanish accents",
        quote: "Rico suave from the island, hip-hop styling...",
        biography: "Keith's Puerto Rican identity persona from the HipHopSite.com era, representing Hispanic culture and Latino identity themes.",
        debut: "HipHopSite.com era (1999)", 
        themes: "Puerto Rican identity, Hispanic culture, Latino representation",
        image: "ricofrompuertorico.jpg"
    },
    
    {
        number: "051", 
        name: "Alien Man", 
        year: "1999", 
        era: "classic",
        age: "5,000 (Earth years, young for an alien)", 
        origin: "Mars (before moving to Jupiter district)",
        likes: "Alien themes, abduction stories", 
        dislikes: "Earthly concerns, being probed by other aliens",
        quote: "Alien Man from outer space, Earth rap in your face...",
        biography: "Keith's alien-themed persona from the HipHopSite.com era, representing extraterrestrial themes and space origin concepts.",
        debut: "HipHopSite.com era (1999)", 
        themes: "Alien imagery, extraterrestrial themes, space origin, otherworldly concepts",
        image: "alienman.jpg"
    },
    
    {
        number: "052", 
        name: "Crazy Lou", 
        year: "1999", 
        era: "classic",
        age: "45 (Ex-Marine Captain)", 
        origin: "Military base (weapons depot)",
        likes: "Weapons design, law enforcement kills, gun modifications", 
        dislikes: "Sexual misconduct charges, peace treaties",
        quote: "Law enforcement, I got the first kill endorsement...",
        biography: "Keith's dark weapons dealer persona from Prince Paul's concept album, representing firearms dealing and military themes.",
        debut: "A Prince Among Thieves (Prince Paul, 1999) - Weapon World", 
        themes: "Firearms dealing, weapon modification, dark humor, military themes",
        image: "crazylou.jpg"
    },
    
    {
        number: "053", 
        name: "Blonde Man", 
        year: "1999", 
        era: "classic",
        age: "36 (hair dye experiment age)", 
        origin: "Hair salon (blonde booth)",
        likes: "Blonde aesthetic, peroxide, standing out", 
        dislikes: "Root touch-ups, brunettes",
        quote: "Blonde ambition in the hip-hop tradition...",
        biography: "Keith's blonde-themed persona appearing in Black Elvis liner notes, representing hair color aesthetic and image transformation.",
        debut: "Black Elvis/Lost in Space liner notes (1999)", 
        themes: "Blonde imagery, aesthetic transformation, liner note persona",
        image: "blondeman.jpg"
    },
    
    // 2000
    {
        number: "054", 
        name: "Keith Korg", 
        year: "2000", 
        era: "classic",
        age: "37 (analog wisdom age)", 
        origin: "Japan (where Korg synthesizers are made)",
        likes: "Analog technology, pimping, flow, vintage keyboards", 
        dislikes: "Digital technology, Auto-Tune",
        quote: "More flow than the average Joe, get off the stamina...",
        biography: "Keith's Analog Brothers identity emphasizing analog technology over digital, representing the analog vs. digital debate in hip-hop production.",
        debut: "Pimp to Eat (2000) with Analog Brothers", 
        themes: "Analog vs digital, pimping, technology, group collaboration",
        image: "keithkorg.jpg"
    },
    
    {
        number: "055", 
        name: "Matthew", 
        year: "2000", 
        era: "classic",
        age: "37 (truth-telling veteran)", 
        origin: "The streets (reality check corner)",
        likes: "Truth, authenticity, being genuine", 
        dislikes: "Rap fantasists, fake MCs, record release parties",
        quote: "Come to your record release party, show you some shit, and make you piss on yourself...",
        biography: "Keith's truth-telling persona representing anti-fake MC rhetoric and industry critique, emphasizing street-level authenticity over industry politics.",
        debut: "Matthew (2000)", 
        themes: "Anti-fake MC rhetoric, industry critique, street-level truth, authenticity",
        image: "matthew.jpg"
    },
    
    {
        number: "056", 
        name: "Black Linen", 
        year: "2000", 
        era: "classic",
        age: "33 (fashion sophistication age)", 
        origin: "Milan (fashion capital)",
        likes: "Silk suits, luxury fabric, thread counts", 
        dislikes: "Cheap materials, polyester",
        quote: "Black Linen smooth, silk suit groove...",
        biography: "Keith's luxury fashion persona paired with Motion Man's Silk Suit, representing high-end fashion and material sophistication.",
        debut: "Masters of Illusion - Silk Suit, Black Linen (2000)", 
        themes: "Luxury fashion, silk and linen imagery, material sophistication",
        image: "blacklinen.jpg"
    },
    
    {
        number: "057", 
        name: "Jimmy Steele", 
        year: "2000", 
        era: "classic",
        age: "44 (steel industry veteran)", 
        origin: "Pittsburgh (steel city)",
        likes: "Steel imagery, tough talk, metalworking", 
        dislikes: "People talking back, aluminum",
        quote: "Shut your mouth, call me Jimmy Steel...",
        biography: "Keith's tough-talking persona with steel/metal imagery, representing aggression and metallic aesthetic themes.",
        debut: "Dr. Dooom - Brothers Feel Fly / Black Elvis liner notes (2000)", 
        themes: "Steel/metal imagery, aggression, tough talk, metallic aesthetics",
        image: "jimmysteele.jpg"
    },
    
    // 2001
    {
        number: "058", 
        name: "Spankmaster", 
        year: "2001", 
        era: "classic",
        age: "38 (kinky maturity age)", 
        origin: "The dungeon (BDSM headquarters)",
        likes: "Kinky cape-wearing, party atmosphere, spanking themes", 
        dislikes: "Lightweight attitudes, vanilla behavior",
        quote: "Spankmaster in the house, cape flying around...",
        biography: "Keith's BDSM-themed party persona representing sexual themes and kinky aesthetics within hip-hop culture.",
        debut: "Spankmaster (2001)", 
        themes: "BDSM references, party themes, sexual content, kinky aesthetics",
        image: "spankmaster.jpg"
    },
    
    // 2003
    {
        number: "059", 
        name: "SK8 Johnson", 
        year: "2003", 
        era: "classic",
        age: "19 (young skater age)", 
        origin: "Venice Beach (skate culture birthplace)",
        likes: "Skateboarding, bootleg videos, kickflips", 
        dislikes: "Posers, broken boards",
        quote: "Rock Gets Ass...",
        biography: "Keith's skateboarding culture persona from bootleg skater videos, representing underground skate culture and video documentation.",
        debut: "Bootleg Skater videos, Bootleg 3000 (2003)", 
        themes: "Skateboarding culture, bootleg videos, underground documentation",
        image: "sk8johnson.jpg"
    },
    
    {
        number: "060", 
        name: "Robert Perry", 
        year: "2003", 
        era: "classic",
        age: "40 (mature Harlem walker)", 
        origin: "Harlem, NY (125th Street)",
        likes: "Walking Harlem streets, street knowledge", 
        dislikes: "Gentrification, tourist buses",
        quote: "Yeah you'll see me walkin down, 125th Street...",
        biography: "Keith's Harlem street persona representing local NYC culture and street-level identity within the Lost Masters project.",
        debut: "Lost Masters (2003)", 
        themes: "Harlem street culture, NYC identity, street-level representation",
        image: "robertperry.jpg"
    },
    
    {
        number: "061", 
        name: "Deli Boy", 
        year: "2003", 
        era: "classic",
        age: "22 (young adult film age)", 
        origin: "San Fernando Valley (adult film capital)",
        likes: "Comedy, adult entertainment crossover, pastrami sandwiches", 
        dislikes: "Bad acting, stale bread",
        quote: "Deli Boy serving hot cuts, comedy and...",
        biography: "Keith's comedy/adult film crossover persona representing his exploration of different entertainment mediums beyond music.",
        debut: "Sex For Life Too (adult film) (2003)", 
        themes: "Comedy/porn crossover, entertainment mediums, adult film cameo",
        image: "deliboy.jpg"
    },
    
    // 2004
    {
        number: "062", 
        name: "John Clayborne (Cousin of Jimmy Hicks)", 
        year: "2004", 
        era: "classic",
        age: "39 (family man age)", 
        origin: "Family house (NYC connection)",
        likes: "Family structures, beer, family reunions", 
        dislikes: "Wack NYC rap scene, distant relatives",
        quote: "New York got nothin' for me to hear, nothin' from me, Y'all wack, grab me a beer...",
        biography: "Keith's family-oriented persona representing family dynamics and NYC rap scene critique within the Clayborne Family project.",
        debut: "Clayborne Family (2004)", 
        themes: "Family dynamics, NYC critique, family structures, rap scene analysis",
        image: "johnclayborne.jpg"
    },
    
    {
        number: "063", 
        name: "Larry Lopez", 
        year: "2004", 
        era: "classic",
        age: "35 (mature lecherous age)", 
        origin: "Miami (adult entertainment crossover capital)",
        likes: "House music, adult film stars, Latin rhythms", 
        dislikes: "Non-lecherous behavior, slow BPMs",
        quote: "Toot Toot Hey Beep Beep",
        biography: "Keith's lecherous house music persona collaborating with adult film star Heather Hunter, representing crossover between music and adult entertainment.",
        debut: "Promotional house track with Heather Hunter (2004)", 
        themes: "Lecherous character, house music, adult entertainment crossover",
        image: "larrylopez.jpg"
    },
    
    {
        number: "064", 
        name: "Mike Stanley", 
        year: "2004", 
        era: "classic",
        age: "31 (Caribbean music collaboration age)", 
        origin: "Kingston (riddim capital)",
        likes: "Riddim warfare, DJ collaborations, sound systems", 
        dislikes: "Digital riddims, quiet systems",
        quote: "Mike Stanley riddim commander, sound system expander...",
        biography: "Keith's reggae/riddim collaboration persona working with DJ Sooky, representing his exploration of Caribbean music influences.",
        debut: "DJ Sooky's Riddim Warfare LP (2004)", 
        themes: "Riddim/reggae influences, DJ collaborations, Caribbean music",
        image: "mikestanley.jpg"
    },
    
    // 2006
    {
        number: "065", 
        name: "Mr. Nogatco", 
        year: "2006", 
        era: "modern",
        age: "51 (government retirement age)", 
        origin: "Area 51 (Government facility)",
        likes: "GPS technology, astrology, UFO research, classified files", 
        dislikes: "Government oversight, mundane reality",
        quote: "Im GPS automatic with astrology...",
        biography: "Keith's UFO conspiracy persona representing government agent themes, alien autopsies, and conspiracy theories within hip-hop.",
        debut: "Nogatco Rd. (2006)", 
        themes: "UFO conspiracies, alien autopsies, government agent, GPS technology",
        image: "mrnogatco.jpg"
    },
    
    // 2007
    {
        number: "066", 
        name: "Underwear Pissy", 
        year: "2007", 
        era: "modern",
        age: "44 (mid-life crisis rapper)", 
        origin: "His underwear drawer",
        likes: "Criticizing rap, grandiose ego imagery, wiping ass with rap, golden showers", 
        dislikes: "Current rap scene, crap rap",
        quote: "I'm wipin my ass with rap right now, cause it's crap right now...",
        biography: "Keith's ego-driven rap critic persona representing his frustration with contemporary rap and grandiose self-image.",
        debut: "The Best Kept Secret (2007) - Ultramagnetic MCs", 
        themes: "Ego trippin', rap criticism, underwear imagery, industry frustration",
        image: "underwearpissy.jpg"
    },
    
    {
        number: "067", 
        name: "Naquan", 
        year: "2007", 
        era: "modern",
        age: "44 (producer maturity)", 
        origin: "Behind the boards (studio birthplace)",
        likes: "Producer credits, Ultramagnetic work, mixing boards", 
        dislikes: "Ghost production, uncredited work",
        quote: "Naquan on the track, bringing Ultra back...",
        biography: "Keith's producer identity representing his behind-the-scenes work and alternative naming for production credits.",
        debut: "The Best Kept Secret (2007) - Ultramagnetic MCs (producer credit)", 
        themes: "Producer identity, alternative name, behind-the-scenes work",
        image: "naquan.jpg"
    },
    
    {
        number: "068", 
        name: "Bobby Grime", 
        year: "2007", 
        era: "modern",
        age: "41 (cleaning veteran age)", 
        origin: "The sewers (where grime lives)",
        likes: "Cleaning up the game, industrial cleaners", 
        dislikes: "Shit stains in rap, dirty MCs",
        quote: "Im getting the shit stains out the game...",
        biography: "Keith's game cleanup persona representing his mission to clean up rap music and remove inferior elements from hip-hop culture.",
        debut: "Commissioner 2 - Cornfields (2007)", 
        themes: "Game cleanup, grime removal, rap purification, industry cleaning",
        image: "bobbygrime.jpg"
    },
    
    {
        number: "069", 
        name: "MC Shopaholic", 
        year: "2007", 
        era: "modern",
        age: "36 (prime shopping age)", 
        origin: "The mall (consumer temple)",
        likes: "Shopping, retail therapy, credit cards", 
        dislikes: "Not shopping, store closures",
        quote: "Im that shopping nigga, Who cant stop...",
        biography: "Keith's consumer culture persona representing shopping addiction and retail therapy within modern American culture.",
        debut: "MC Shopaholic track (2007, MySpace release)", 
        themes: "Consumer culture, shopping addiction, retail therapy, modern materialism",
        image: "mcshopaholic.jpg"
    },
    
    // 2008
    {
        number: "070", 
        name: "Hollywood Roach Raider", 
        year: "2008", 
        era: "modern",
        age: "38 (exterminator prime)", 
        origin: "Hollywood",
        likes: "Getting high, being unique, pest control, raid cans", 
        dislikes: "Competition, clean houses",
        quote: "There's nobody out there, To compare to me...",
        biography: "Keith's Hollywood lifestyle persona using pest control metaphors, representing unique status and Hollywood culture critique.",
        debut: "High track (2008, MySpace release)", 
        themes: "Hollywood lifestyle, pest control metaphor, uniqueness, getting high",
        image: "hollywoodroachraider.jpg"
    },
    
    // 2009
    {
        number: "071", 
        name: "Tashan Dorrsett", 
        year: "2009", 
        era: "modern",
        age: "46 (NYC reality veteran)", 
        origin: "New York City",
        likes: "Genuine representation, NYC reality, ladies, keeping it real", 
        dislikes: "Fake spirituality, phony preachers",
        quote: "Tashan Dorrsett, All the ladies get wet...",
        biography: "Keith's NYC reality persona emphasizing genuine representation over fake spirituality, later evolved into cosmic preacher themes.",
        debut: "Tashan Dorrsett (2009)", 
        themes: "NYC street reality, genuine representation, anti-fake spirituality, ladies man",
        image: "tashandorrsett.jpg"
    },
    
    // 2011
    {
        number: "072", 
        name: "Lotion Man", 
        year: "2011", 
        era: "modern",
        age: "48 (mature skin care age)", 
        origin: "The spa (luxury skin treatment center)",
        likes: "Lotioning women, moisturizing, cocoa butter", 
        dislikes: "Dry skin, ashy elbows",
        quote: "People are so dry now days...",
        biography: "Keith's skin care persona from unreleased Yeti Beats material, representing moisturizing themes and intimate skin care.",
        debut: "Kool Keith TV (2011, unreleased Yeti Beats)", 
        themes: "Moisturizing, skin care, intimate themes, unreleased material",
        image: "lotionman.jpg"
    },
    
    {
        number: "073", 
        name: "Michael Winslow", 
        year: "2011", 
        era: "modern",
        age: "45 (demolition veteran)", 
        origin: "Demolition Derby track",
        likes: "Demolition derby racing, car crashes", 
        dislikes: "People in his way, seat belts",
        quote: "Get out my way...",
        biography: "Keith's demolition derby persona from unreleased material, representing racing culture and aggressive driving themes.",
        debut: "Kool Keith TV (2011, unreleased Yeti Beats)", 
        themes: "Racing, demolition derby, aggressive driving, unreleased TV concept",
        image: "michaelwinslow.jpg"
    },
    
    {
        number: "074", 
        name: "Big Bongo Dong", 
        year: "2011", 
        era: "modern",
        age: "52 (percussion master age)", 
        origin: "Congo (where bongos originated)",
        likes: "Playing bongos, percussion, tribal rhythms", 
        dislikes: "Electronic drums, quiet music",
        quote: "Bongo Solo...",
        biography: "Keith's percussion-focused persona from unreleased TV material, representing musical instruments and rhythm-based identity.",
        debut: "Kool Keith TV (2011, unreleased Yeti Beats)", 
        themes: "Bongo percussion, musical instruments, rhythm focus, TV concept",
        image: "bigbongodong.jpg"
    },
    
    // 2012
    {
        number: "075", 
        name: "Ultraman 7000", 
        year: "2012", 
        era: "modern",
        age: "7000 (the number in his name)", 
        origin: "Planet Ultra (Twitter dimension)",
        likes: "Twitter, presentation, social media", 
        dislikes: "Spam accounts, character limits",
        quote: "Presented by Ultraman 7000...",
        biography: "Keith's social media persona combining Ultraman imagery with digital presence, representing his adaptation to social media culture.",
        debut: "Twitter persona, Bobby Blak track (2012)", 
        themes: "Ultraman imagery, digital presence, social media adaptation",
        image: "ultraman7000.jpg"
    },
    
    {
        number: "076", 
        name: "Bobby Blak", 
        year: "2012", 
        era: "modern",
        age: "35 (Big Mac consumer age)", 
        origin: "McDonald's (where Big Macs are born)",
        likes: "Big Macs, taking girls out, fast food dates", 
        dislikes: "Burger King, healthy food",
        quote: "Im Bobby Blak, You know how i do, take your girl to get a Big Mac...",
        biography: "Keith's fast food culture persona representing modern dating and consumer culture through fast food references.",
        debut: "Bobby Blak track (2012)", 
        themes: "Fast food culture, dating, consumer culture, modern lifestyle",
        image: "bobbyblak.jpg"
    },
    
    {
        number: "077", 
        name: "Flash Gordon", 
        year: "2012", 
        era: "modern",
        age: "30 (space hero prime age)", 
        origin: "Mongo (Flash Gordon's planet)",
        likes: "Sci-fi heroics, establishing dominance, rocket ships", 
        dislikes: "Rappers not knowing their place, Ming the Merciless",
        quote: "Rappers know they place when they call me Flash Gordon...",
        biography: "Keith's sci-fi hero persona establishing dominance over other rappers through space adventure themes and heroic imagery.",
        debut: "Flash Gordon track (2012)", 
        themes: "Sci-fi heroics, space adventure, rapper dominance, heroic imagery",
        image: "flashgordon.jpg"
    },
    
    {
        number: "078", 
        name: "Dr. Philadelphia", 
        year: "2012", 
        era: "modern",
        age: "41 (reinvention specialist age)", 
        origin: "Philadelphia",
        likes: "Reinvention, swag, cheesesteaks", 
        dislikes: "Shelf life, stagnation",
        quote: "Allow me to re-invent myself, take my balls off the shelf...",
        biography: "Keith's reinvention persona representing Philadelphia pride and constant self-transformation within hip-hop culture.",
        debut: "Swag track (2012)", 
        themes: "Philadelphia pride, reinvention, swag culture, self-transformation",
        image: "drphiladelphia.jpg"
    },
    
    {
        number: "079", 
        name: "MC New York", 
        year: "2012", 
        era: "modern",
        age: "49 (NYC veteran)", 
        origin: "New York",
        likes: "Dart throwing, NYC representation, precision targeting", 
        dislikes: "Unknown rappers, missing the bullseye",
        quote: "Practicing throwing darts, at mags full of unknowns...",
        biography: "Keith's NYC pride persona using dart precision as metaphor for targeting unknown rappers and representing New York hip-hop culture.",
        debut: "MC New York track (2012)", 
        themes: "NYC pride, dart precision, targeting unknowns, New York representation",
        image: "mcnewyork.jpg"
    },
    
    {
        number: "080", 
        name: "MC NBA", 
        year: "2012", 
        era: "modern",
        age: "33 (basketball prime age)", 
        origin: "Basketball court (center court)",
        likes: "Basketball, slam dunks, March Madness", 
        dislikes: "Weak competition, missed free throws",
        quote: "I slam dunk competition...",
        biography: "Keith's basketball culture persona representing athletic dominance and sports metaphors within hip-hop competition.",
        debut: "Slam Dunk track (2012)", 
        themes: "Basketball culture, athletic dominance, sports metaphors, competition",
        image: "mcnba.jpg"
    },
    
    {
        number: "081", 
        name: "The Photographer", 
        year: "2012", 
        era: "modern",
        age: "37 (artistic eye age)", 
    {
        number: "081", 
        name: "The Photographer", 
        year: "2012", 
        era: "modern",
        age: "37 (artistic eye age)", 
        origin: "Camera store (Nikon section)",
        likes: "Photography, gorgeous subjects, perfect lighting", 
        dislikes: "Blurry shots, ugly people",
        quote: "You look gorgeous baby...",
        biography: "Keith's photography persona representing visual aesthetics and his interest in capturing beautiful subjects through photography.",
        debut: "Project X album (2012)", 
        themes: "Photography, visual aesthetics, beauty capture, artistic vision",
        image: "photographer.jpg"
    },
    
    // 2014
    {
        number: "082", 
        name: "Number One Producer", 
        year: "2014", 
        era: "modern",
        age: "51 (producer veteran age)", 
        origin: "Studio One (legendary studio)",
        likes: "Self-production, braggadocious flex, platinum plaques", 
        dislikes: "Fugazy producers, ghost production",
        quote: "Im the Number 1 Producer...",
        biography: "Keith's producer braggadocio persona representing his self-production skills and superiority over other producers in hip-hop.",
        debut: "Demolition Crash (2014)", 
        themes: "Producer braggadocio, self-production, producer superiority, production skills",
        image: "numberoneproducer.jpg"
    },
    
    {
        number: "083", 
        name: "The Commi$ioner", 
        year: "2014", 
        era: "modern",
        age: "48 (commissioner authority age)", 
        origin: "Commissioner's office (authority headquarters)",
        likes: "Authority, reports, dollar signs in names", 
        dislikes: "Insubordination, budget cuts",
        quote: "Report to the Commissioner...",
        biography: "Keith's authority figure persona representing police/military command and administrative control within hip-hop hierarchy.",
        debut: "Commissioner 1 and Commissioner 2 albums (2014)", 
        themes: "Authority figures, police/military command, administrative control, hierarchy",
        image: "commissioner.jpg"
    },
    
    // 2020
    {
        number: "084", 
        name: "Space Goretex", 
        year: "2020", 
        era: "new",
        age: "All ages combined (multi-persona entity)", 
        origin: "Space",
        likes: "Combining all personas, waterproof materials", 
        dislikes: "Single identity limitations, water damage",
        quote: "Space Goretex, all personas in one complex...",
        biography: "Keith's multi-persona integration project combining all major characters into one space-themed concept, representing the evolution of his entire persona universe.",
        debut: "Space Goretex (2020)", 
        themes: "Persona integration, space themes, character combination, universe evolution",
        image: "spacegoretex.jpg"
    },
    
    // 2023
    {
        number: "085", 
        name: "Mr. Controller", 
        year: "2023", 
        era: "new",
        age: "Infinite (Cosmic entity)", 
        origin: "Cosmic realm",
        likes: "Galactus-inspired cosmic control, comic book aesthetics, universal domination", 
        dislikes: "Lack of control, superheroes",
        quote: "Cosmic Power",
        biography: "Keith's latest cosmic entity persona inspired by Galactus, representing ultimate cosmic control and comic book aesthetics with dancehall influences.",
        debut: "Mr. Controller (2023)", 
        themes: "Cosmic control, Galactus-inspired imagery, comic book aesthetic, dancehall influences",
        image: "mrcontroller.jpg"
    }
];

// Don't change anything below this line
console.log('📋 Loaded ' + PERSONAS_DATABASE.length + ' personas from database');
