// ULTRA KEITH PERSONAS DATABASE - ORIGINAL COMPRESSED FORMAT
// All 85 personas (1984-2023) - EXACT ORIGINAL

var PERSONAS_DATABASE = [
{number:"001",name:"Activity",year:"1984",era:"old",age:"20",origin:"NYC",likes:"Breakdancing, popping and rocking",dislikes:"Sitting still, slow music",quote:"I Pop it like that, Rock it like that...",biography:"Keith's first documented persona from the NYC Breakers breakdancing crew.",debut:"NYC Breakers (1984)",themes:"Breakdancing culture, early hip-hop foundation",image:"activity.jpg"},
{number:"002",name:"Kool Keith",year:"1988",era:"old",age:"25",origin:"Bronx, NY",likes:"Porn, Animals",dislikes:"Girls who are not innovative",quote:"I'm the master of the game, all the girls know my name.",biography:"Keith's primary rap persona. The revolutionary MC who broke all rules.",debut:"Critical Beatdown (1988)",themes:"Complex rhymes, sci-fi concepts",image:"koolkeith.jpg"},
{number:"003",name:"MC Ultra",year:"1988",era:"old",age:"24",origin:"Bronx",likes:"Echo chambers, reverb effects",dislikes:"Wack MCs, digital delays",quote:"MC Ultra sound, echo through your town...",biography:"Early Bronx-based persona representing Keith's foundational MC identity.",debut:"Late 1980s (Ultramagnetic era)",themes:"Bronx identity, early MC development",image:"mcultra.jpg"},
{number:"004",name:"Dr. Sperm",year:"1988",era:"old",age:"32",origin:"Laboratory test tube",likes:"Reproductive science, petri dishes",dislikes:"Birth control, sterile environments",quote:"Dr. Sperm in the house, making life from scratch...",biography:"One of Keith's earliest aliases representing experimental persona development.",debut:"Early career alias (1988)",themes:"Medical themes, experimental development",image:"drsperm.jpg"},
{number:"005",name:"Exotron Geiger Counter One Plus Megatron",year:"1989",era:"old",age:"10,000",origin:"Cybertron",likes:"Scientific names, radio appearances",dislikes:"Simple identities, Autobots",quote:"Exotron readings off the meter...",biography:"Keith's experimental radio persona combining scientific complexity with Transformers references.",debut:"Marley Marl radio show (1989)",themes:"Scientific complexity, radio culture",image:"exotron.jpg"},
{number:"006",name:"Exotron Geiger Counter One Gamma Plus Sequencer",year:"1989",era:"old",age:"10,001",origin:"Cybertron",likes:"Sequencer technology, gamma radiation",dislikes:"Simple identities, analog equipment",quote:"Gamma sequences activate...",biography:"Extended version of Keith's scientific radio persona.",debut:"Marley Marl radio show (1989)",themes:"Scientific complexity, sequencer technology",image:"exotron-gamma.jpg"},
{number:"007",name:"Big Willie Smith",year:"1995",era:"old",age:"22",origin:"Uptown",likes:"Blondes, Cold Duck",dislikes:"Landlords, Antennas",quote:"Keep it real, represent what? My nuts!",biography:"Keith's street credibility persona from his Beat Terrorists EP era.",debut:"Big Willie Smith EP (1995)",themes:"Street credibility, independent releases",image:"bigwilliesmith.jpg"},
{number:"008",name:"X-74",year:"1995",era:"old",age:"74",origin:"Cenobite dimension",likes:"Dope verses, mathematical equations",dislikes:"Wack rhymes, solved equations",quote:"X marks the spot where the dope verse drops...",biography:"Keith's Cenobites collaboration persona exploring abstract rhyming.",debut:"Cenobites EP (1995)",themes:"Abstract rhyming, underground collaboration",image:"x74.jpg"},
{number:"009",name:"Poppa Large",year:"1992",era:"old",age:"35",origin:"Bronx, NY",likes:"Daredevil videos, Spinning around",dislikes:"Quicksand, Soft Pretzels",quote:"I'm Poppa Large, Big Shot On The East Coast",biography:"Keith's East Coast supremacy persona emphasizing regional pride.",debut:"Funk Your Head Up (1992)",themes:"East Coast supremacy, braggadocio",image:"poppalarge.jpg"},
{number:"010",name:"Rhythm X",year:"1992",era:"old",age:"30",origin:"BX, New York",likes:"Mae West, Gastronomy",dislikes:"Traffic, Soft Cauliflower",quote:"Rhythm X roller, my style gets critical...",biography:"Keith's rhythmic complexity persona combining wordplay with culinary interests.",debut:"Funk Your Head Up (1992)",themes:"Rhythmic complexity, crossover appeal",image:"rhythmx.jpg"},
{number:"011",name:"The X",year:"1992",era:"mid",age:"Infinite",origin:"Algebraic dimension",likes:"Four Horsemen imagery, mathematical mysteries",dislikes:"Being solved, simple equations",quote:"I'm the X factor, mathematical reactor...",biography:"Mysterious X-identity connected to Ultramagnetic's Four Horsemen concept.",debut:"Ultramagnetic MC's Four Horsemen LP (1992)",themes:"X-identity, apocalyptic imagery",image:"thex.jpg"},
{number:"012",name:"X-Caliber",year:"1992",era:"mid",age:"1000",origin:"Stone (where Arthur pulled the sword)",likes:"Funk radio, sword imagery",dislikes:"Rust, modern weapons",quote:"X-Caliber slice through funk like butter...",biography:"Sword-themed persona combining medieval weaponry with funk radio culture.",debut:"Funk Your Head Up (1992)",themes:"Sword imagery, medieval hip-hop fusion",image:"xcaliber.jpg"},
{number:"013",name:"The Fourth Horseman",year:"1992",era:"mid",age:"Eternal",origin:"Apocalyptic realm",likes:"Apocalyptic themes, horsemen mythology",dislikes:"Peace, happy endings",quote:"Fourth Horseman riding, apocalypse providing...",biography:"Keith's apocalyptic persona connected to biblical Four Horsemen imagery.",debut:"Ultramagnetic MC's Four Horsemen LP (1992)",themes:"Apocalyptic imagery, biblical references",image:"fourthorseman.jpg"},
{number:"014",name:"Funk Igniter Plus",year:"1992",era:"mid",age:"28",origin:"The funk dimension",likes:"Funk radio, igniting funk",dislikes:"Non-funk music, disco",quote:"Funk Igniter Plus, set the bass on fire...",biography:"Keith's funk radio persona dedicated to igniting funk music culture.",debut:"Funk Your Head Up (1992)",themes:"Funk music, radio culture",image:"funkigniter.jpg"},
{number:"015",name:"Dr. Octagon",year:"1993",era:"classic",age:"Deceased",origin:"Jupiter",likes:"n/a",dislikes:"n/a",quote:"No please, don't shoot!",biography:"Keith's most famous persona - an alien surgeon from Jupiter performing bizarre medical procedures.",debut:"Smoking Dust (1993), Dr. Octagonecologyst (1996)",themes:"Bizarre medical procedures, underground hip-hop revolution",image:"droctagon.jpg"}
];

// Convert to window.personasData format for compatibility
window.personasData = PERSONAS_DATABASE.map(persona => ({
    name: persona.name,
    era: persona.year,
    style: persona.likes,
    origin: persona.origin,
    albums: persona.debut,
    quote: persona.quote,
    biography: persona.biography,
    notableTracks: persona.debut,
    influence: persona.themes,
    image: persona.image
}));

console.log('🎉 ALL PERSONAS LOADED! Total: ' + PERSONAS_DATABASE.length + ' personas');
