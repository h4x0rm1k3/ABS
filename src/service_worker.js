const constants = Object.freeze({
  ONE_DAY_MINS: 24 * 60,
  ONE_DAY_MILLIS: 24 * 60 * 60 * 1000,
  BADGE_COLORS: Object.freeze({
    REMINDER: '#F41A22',
    COUNT: '#2196F3',
  }),
  BADGE_REMINDER_TEXT: '!',
  ALARMS: Object.freeze({
    REMINDER: 'reminder-alarm',
    SCHEDULED_SEARCH: 'scheduled-search-alarm',
    FETCH_DAILY_TRENDS: 'fetch-daily-trends-alarm',
  }),
  CLICK_DELAY: 500,
  DEFAULT_PREFERENCES: Object.freeze({
    desktopIterations: 50,
    mobileIterations: 40,
    delay: 1000,
    autoClick: true,
    randomGuesses: true,
    randomSearch: false,
    randomSearchDelayMin: 1200,
    randomSearchDelayMax: 2500,
    randomSearchIterationsMin: 35,
    randomSearchIterationsMax: 42,
    randomLettersSearch: false,
    blitzSearch: false,
    platformSpoofing: 'desktop-and-mobile',
    customQueries: '',
    searchWithCustomQueries: true,
    searchWithDailyTrends: true,
    searchWithTemplates: false,
    scheduleSearches: true,
    scheduledTime: '02:00',
    scheduledTimeOpensRewardTasks: true,
  }),
  MESSAGE_TYPES: Object.freeze({
    START_SEARCH: 0, // popup => background script
    STOP_SEARCH: 1, // popup => background script
    GET_SEARCH_COUNTS: 2, // popup => background script
    UPDATE_SEARCH_COUNTS: 3, // background script => popup
    CLEAR_SEARCH_COUNTS: 4, // background script => popup
    CORRECT_ANSWER_RECEIVED: 5, // window-variable-grabber script => content script
    OPEN_URL_IN_BACKGROUND: 6, // window-variable-grabber script => content script => background script
  }),
  REWARDS_URL: 'https://rewards.microsoft.com/?redref=amc',
  DAILY_TRENDS_API: 'https://trends.google.com/trends/api/dailytrends?geo=US',
  NUM_DAILY_TREND_FETCHES: 4,
  // TODO: add more mobile user agents
  MOBILE_USER_AGENTS: Object.freeze([
    'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Mobile Safari/537.36 Edg/86.0.622.51',
  ]),
  EDGE_USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36 Edg/86.0.622.51',
});
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a new array without duplicates. Does not modify original array.
 */
function removeDuplicates(list) {
  return list.reduce((acc, element) => {
    if (element && !acc.includes(element)) return [...acc, element];
    return acc;
  }, []);
}

/**
 * Modifies the original array and whenever predicateFn returns true (given an array element),
 * it removes that element from the array
 */
function remove(array, predicateFn) {
  for (let i = array.length - 1; i > -1; i--) {
    if (predicateFn(array[i])) array.splice(i, 1);
  }
}

function clearBadge() {
  chrome.action.setBadgeText({ text: '' });
}

function getCurrentTab() {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      resolve(tabs[0]);
    });
  });
}

function getDateFromTime(time) {
  const date = new Date();
  const [hourStr, minStr] = time.split(':');
  date.setHours(Number(hourStr), Number(minStr), 0);
  return date;
}

function getMidnightDate() {
  const date = new Date();
  date.setHours(0, 0, 0);
  return date;
}
const socialMedias = ["instagram", "twitter", "youtube", "tiktok", "twitch"];

const people = ["gabourey sidibe","gavin rossdale","gayatri joshi","gemma arterton","gemma ward","genelia d’souza","george clooney","george michael","gerard butler","geri halliwell","ghada kunash","ghaith al ghaith","gillian anderson","ginnifer goodwin","giorgio armani","girls aloud","gisele bündchen","gisele bundchen","giuliana rancic","goldie hawn","gordon ramsay","govind nihalani","govinda","gul panag","gulshan kavarana","guy ritchie","gwen stefani","gwyneth paltrow","halle berry","haneef al raisani","hansika motwani","harman baweja","harper seven beckham","harrison ford","hassan habib","hassan shehreyar yasin","hayden christensen","hayden panettiere","haylie duff","heath ledger","heather graham","heather locklear","heidi klum","heidi montag","helen frith powell","helen mirren","helena bonham carter","hema malini","hilary duff","hilary swank","himesh reshammiya","hind abdulrazak","hrishitaa bhatt","hrithik roshan","hugh grant","hugh jackman","hulk hogan","j k rowling","j.c butler","jack black","jack nicholson","jackie shroff","jada pinkett smith","jade goody","jaden smith","jake gyllenhaal","jalal chahda","james franco","james hogan","james marsden","james purefoy","jamie cullum","jamie foxx","jamie lee curtis","jamie lynn spears","jamie oliver","jane krakowski","jane lynch","janet jackson","janice dickinson","january jones","jason biggs","javed akhtar","javed jaffri","javier bardem","jay manuel","jay z","jaya bachchan","jaya prada","jc and sim","jean-paul gaultier","jeetendra","jennifer aniston","jennifer connelly","jennifer garner","jennifer hudson","jennifer lawrence","jennifer lopez","jennifer love hewitt","jenson button","jeremy clarkson","jeremy piven","jeremy renner","jerry bruckheimer","jerry seinfeld","jesse eisenberg","jesse james","jesse mccartney","jessica alba","jessica biel","jessica michibata","jessica simpson","jessica szohr","jessie shrimali","jiah khan","jim carrey","jimmy choo","jimmy fallon","jimmy shergill","joaquin phoenix","jodhi may","jodie kidd","joe jonas","joe manganiello","joel madden","john abraham","john galiano","john mayer","john travolta","johnny depp","johnny lever","jon bon jovi","jonathan rhys meyers","jordan","joseph gordon-levitt","josh duhamel","josh hartnett","josh kelley","joshua jackson","joss stone","jude law","jugal hansraj","juhi chawla","julia dempster","julia ormond","julia roberts","julia stiles","julian mcmahon","julianne moore","juliette lewis","justin bieber","justin long","justin timberlake","kal penn","kamal haasan","kangana ranaut","kanye west","karan johar","kareena kapoor","karl wolf","kat von d","kate beckinsale","kate bosworth","kate dalheimer &amp; henry dyer","kate hudson","kate middleton","kate moss","kate winslet","katharine mcphee","katherine heigl","katie holmes","katie price","katrina kaif","katy perry","keanu reeves","keira knightley","keith urban","kelis","kellan lutz","kelly brook","kelly clarkson","kelly lundberg","kelly osbourne","kelly rowland","kelly rutherford","ken paves","kendall jenner","kendra wilkinson","kerry katona","kesha","kevin connolly","kevin federline","kevin spacey","khalid alsuwaidi","khloe kardashian","kim cattrall","kim kardashian","kim sharma","kimberley walsh","kimberly stewart","kimora lee simmons","kirron kher","kirsten dunst","kirstie alley","klaus ehrenbrandtner","koena mitra","konkona sen sharma","kourtney kardashian","kristen bell","kristen renton","kristen scott thomas","kristen stewart","kristin cavallari","kristin davis","kristin scott thomas","kt tunstall","kumar gaurav","kumar sanu","kunal khemu","kunal kohli","kurt russell","kylie minogue","lady gaga","lamar odom","lance van breda","lara dutta","lara stone","larry king","lars narfeldt","lata mangeshkar","laura murtauno","lauren conrad","lea michele","leighton meester","leona lewis","leonardo dicaprio","lewis hamilton","liam gallagher","liam hemsworth","liam neeson","lil&#039; kim","lily allen","lily cole","lindsay lohan","lindsay price","lisa kudrow","liv tyler","liza de jimenez de luna","lo bosworth","lola lopez","lourdes leon","lucky ali","lucy liu","lujain omran","luke wilson","lupe roldan and martin valent","macaulay culkin","maddox jolie-pitt","madonna","maggie gyllenhaal","mahima chaudhry","maitha el abbar","malaika arora-khan","malin akerman","malliha tabari","mallika sherawat","mandira bedi","mandy moore","mani ratnam","manish malhotra","manisha koirala","manjari phadnis","manoj bajpai","marc anthony","marc jacobs","marcia cross","maria conceicao","maria dowling","mariah carey","marion cotillard","marisa tomei","mariya kassam","mark ronson","mark wahlberg","markus thesleff","martin lawrence","mary j blige","mary-kate olsen","matt damon","matt dillon","matt goss","matt leblanc","matthew fox","matthew marsden","matthew mcconaughey","matthew morrison","matthew perry","mauizo and edwina viel","meat loaf","meg ryan","megan fox","mel b","mel gibson","melanie chisholm","melissa george","meryl streep","michael douglas","michael jackson","michael keaton","michelle monaghan","michelle obama","michelle pfeiffer","michelle rodriguez","michelle williams","mick jagger","mike myers","mila kunis","miley cyrus","milind soman","milla jovovich","millie tsai","minka kelly","miranda kerr","mischa barton","mithoon","mithun chakraborty","mo&#039;nique","mohammed al habtoor","mohnish behl","molly sims","monica cruz","morgan freeman","mugdha godse","nagarjuna","nagesh kukunoor","nana patekar","nandita das","naomi campbell","naomi watts","nariman zaydan","naseeruddin shah","natalie carney", "kapoor wazir","natalie imbruglia","natalie portman","natascha mcelhone","natasha bedingfield","natassia scarlett","nazia husein","ne-yo","neetu chandra","neha dhupia","neil nitin mukesh","nelly furtado","neve campbell","new kids on the block","nicholas hoult","nick cannon","nick carter","nick jonas","nicki minaj","nicky hilton","nicolas cage","nicole kidman","nicole richie","nicole scherzinger","nicollette sheridan","p diddy","padma lakshmi","paloma faith","pamela anderson","pankaj kapur","paresh rawal","paris hilton","patricia arquette","patrick dempsey","paul mccartney","paula abdul","peaches geldof","penelope cruz","penn badgley","perez hilton","perizaad zorabian","pete wentz","peter andre","peter jackson","phil collins","pierce brosnan","pierre cardin","piers morgan","pink","pink floyd","pixie geldof","pixie lott","pooja bedi","preity zinta","prince harry","prince william","priyanka chopra","priyanshu chatterjee","r kelly","rachel bilson","rachel mcadams","rachel weisz","rachel zoe","rahul bose","rahul khanna","rahul mahajan","rahul roy","raima sen","raj babbar","rajat kapoor","rajesh khanna","rajiv khandelwal","rakesh roshan","rakeysh omprakash mehra","rakhi sawant","ralph fiennes","ram gopal varma","ramesh sippy","ranbir kapoor","randeep hooda","rani mukerji","ranvir shorey","rati agnihotri","raveena tandon","rebecca de courcy-ireland","rebecca demornay","rebecca hall","rebecca romijn","reese witherspoon","renee zellweger","richard branson","ricky gervais","ricky martin","rihanna","rima and dina zahran","rimi sen","rishi kapoor","rita ora","rob lowe","robbie williams","robert buckley","robert carlyle","robert de niro","robert downey jr","robert pattinson","robin williams","rod stewart","rohini gehani","roisin murphy","ronan keating","rosario dawson","rose byrne","roselyn sanchez","rosie hayes","rosie huntington-whiteley","ross gardiner","rumer willis","rupert friend","rupert grint","russ kientch","russell brand","russell crowe","ruth bradley","ryan gosling","ryan philippe","ryan reynolds","ryan seacrest","sacha baron cohen","sacha jafri","saddruddin hashwani","sadie frost","saeed saif hamarain","saif ali khan","salina handa","salma hayek","sam mendes","sam niell","sam worthington","samantha ronson","samuel l jackson","sandra bullock","sania mirza","sanjay suri","sarah belhasa","sarah chalke","sarah ferguson","sarah jessica parker","sarah michelle gellar","sarah wynter","scarlett johansson","scott disick","seal","sean paul","sean penn","seann william scott","sebastian noat","selena gomez","selma blair","seth green","sex and the city","shaan","shabana azmi","shae brotherton","shah rukh khan","shahid kapur","shahriar khodjasteh","shakira","shakti kapoor","shamita shetty","shane warne","shankar, ehsaan and loy","sharon osbourne","sharon stone","shashi kapoor","shekhar kapur","shekhar suman","sheryl crow","shia labeouf","shiloh nouvel jolie-pitt","shilpa shetty","shiney ahuja","shreyas talpade","sienna miller","sigourney weaver","simon cowell","simon le bon","simone heng","snooki","sofia vergara","soha and javier nashaat","sohail khan","solange knowles","sonali bendre","sonam kapoor","sonu nigam","sophia loren","sophie dahl","sophie ellis-bextor","sophie mir","sophie monk","spencer pratt","sridevi","stefano gabbana","stella mccartney","stephanie pratt","steve carell","steve martin","steve zahn","stevie wonder","sting","subhash ghai","sunidhi chauhan","suniel shetty","suri cruise","susan sarandon","sushmita sen","sarah larson","tahmina nargis memon","tamara mellon","tanushree dutta","taylor lautner","taylor momsen","taylor swift","teri hatcher","terrence howard","thandie newton","the pussycat dolls","theresa gobara","thomas lundgren","thomas oveson","tiffany thornton","tiger woods","tilda swinton","tina fey","tinsley mortimer","tobey maguire","tom and dan","tom cruise","tom ford","tom hanks","tom jones","tom sturridge","tom welling","tommy hilfiger","tori spelling","twinkle khanna","tyra banks","vanessa hudgens","vanessa paradis","vanessa williams","venus williams","vera farmiga","victoria beckham","victoria silvstedt","vidya balan","vidya malvade","vin diesel","vinay pathak","vince vaughn","vinod khanna","virginie &amp; olivier dolz","virginie maillard","arnold schwarzenegger","emma watson","daniel radcliffe","brad pitt","charles chaplin","sylvester stallone","will smith","clint eastwood","cameron diaz","steven spielberg","al pacino","robert downey jr.","sean connery","orlando bloom","dwayne johnson","jackie chan","angelina jolie","adam sandler","anne hathaway","edward norton","bradley cooper","will ferrell","daniel craig","ian mckellen","bruce willis","samuel l. jackson","ben stiller","tommy lee jones","antonio banderas","denzel washington","tim allen","jean-claude van damme","zach galifianakis","owen wilson","christian bale","bruce lee","drew barrymore","bill murray","jason statham","jet li","rowan atkinson","marlon brando","channing tatum","ben affleck","emma stone","chris hemsworth","james mcavoy","james cameron","amitabh bachchan","brendan fraser","tom hiddleston","aamir khan","rajinikanth","wayne gretzky","eddie murphy","michael caine","gary oldman","stellan skarsgard","anthony daniels","stanley tucci","robert deniro","andy serkis","don cheadle","woody harrelson","cate blanchett","elizabeth banks","jonah hill","idris elba","dustin hoffman","philip seymour hoffman","chris evans","50 cent","a trak","aarti chhabria","aarya babbar","abbie cornish","abhay deol","abhishek bachchan","adel ali","adele","bar refaeli","barkha shewakramani","barney york and lindsay steven","barry kirsch","bebhinn kelly","benji madden","beyonce knowles","bhoomika chawla","caitlin wilson","camilla chaudry","carey mulligan","carla bruni","carly ray jepsen","carmen electra","carrie underwood","casey affleck","cash warren","dakota fanning","dalia dogmoch soubra","dannii minogue","danny denzongpa","dariush zandi","darsheel safary","david arquette","david beckham","ed westwick","eileen wallis","elizabeth hurley","elizabeth jagger","elle macpherson","ellen degeneres","ellen page","ellen pompeo","fadi daroub","farah khan","fardeen khan","farhan akhtar","fearne cotton","felicity huffman","fergie","feroz khan","fitriana hay","frankie dettori","imran khan","imran saeed chaudury","ingie chalhoub","irrfan khan","isaac hayes","isabel lucas","isabelle de la bruyere","isha koppikar","isla fisher","ivanka trump","oded fehr","oj simpson","olivia palermo","olivia wilde","om puri","oprah winfrey","ozzy osbourne","queen latifah","quentin tarantino","uday chopra","uma thurman","upen patel","urmila matondkar","usher","wayne rooney","wentworth miller","westlife","whitney houston","whitney port","willie garsob","willow smith","winona ryder","will.i.am","xavier samuel","yana gupta","yash chopra","yvonne zima","zac efron","zaeem jamal","zain mustafa","zayan gardour","zayed khan","zeenat aman","zeina sultani","zoe saldana","zooey deschanel","adhyayan suman","aditi govitrikar","aditya narayan","aditya pancholi","adrian grenier","aerosmith","agyness deyn","aiisha ramadan","aimee queenborough smith","ajay devgan","akshay kumar","akshaye khanna","alanis morissette","alec baldwin","alex rodriguez","alexa chung","alexander mcqueen","alexander skarsgard","ali f mostafa","ali larter","ali lohan","alicia keys","alka yagnik","amal alamuddin","amanda seyfried","america ferrera","amisha patel","amrita arora","amrita rao","amy adams","amy winehouse","anastasia griffith","andrew garfield","anil kapoor","anna wintour","annalynne mccord","annette bening","annie lennox","anupam kher","anushka sharma","arbaaz khan","archana puran singh","asha bhosle","ashlee simpson","ashley greene","ashley olsen","ashley tisdale","ashmit patel","ashton kutcher","ashutosh gowarikar","asin","asmaa al-shabibi","atif aslam","audrina patridge","avril lavigne","ayesha and dipesh dipala","ayesha takia","billy ray cyrus","bipasha basu","bjork","blake lively","bobby deol","bobby kamani","boman irani","bonnie somerville","bonnie wright","brian austin green","britney spears","brittany snow","brody jenner","brooke shields","brooklyn decker","bruce dickinson","bryan adams","cat deeley","catboy and geordiebird","catherine zeta-jones","celina jaitley","celine dion","chace crawford","chad michael murray","charlie sheen","charlize theron","chelsea clinton","chelsy davy","cher","cheryl cole","chloe sevigny","chris brown","chris martin","christian louboutin","christina aguilera","christina applegate","christina ricci","chunky pandey","claire danes","claudia schiffer","coleen rooney","colin farrell","colin firth","corrine bailey rae","courteney cox","cristiano ronaldo dos santos aveiro","cruz beckham","cynthia nixon","david hasselhoff","david letterman","dayanara torres","deepika padukone","demi lovato","demi moore","denise richards","desert heat","dev patel","dharmendra","diane kruger","dilip kumar","dina abdulhadi daryani","dina lohan","dino morea","dita von teese","dj bliss and brothers","domenico dolce","dominic cooper","donatella versace","doug reinhardt","elton john","emily blunt","emily deschanel","emma bunton","emma roberts","emmanuel sabater","enrique iglesias","eric bana","erin o`connor","esha deol","esther canadas","esther tognozzi","eva longoria","eva mendes","ewan mcgregor","freida pinto"];

const animals = ["canidae","felidae","cat","cattle","dog","donkey","goat","guinea pig","horse","pig","rabbit","laboratory rat strains","sheep breeds","water buffalo breeds","chicken breeds","duck breeds","goose breeds","pigeon breeds","turkey breeds","aardvark","aardwolf","african buffalo","african elephant","african leopard","albatross","alligator","alpaca","american buffalo","american robin","amphibian","anaconda","angelfish","anglerfish","ant","anteater","antelope","antlion","ape","aphid","arabian leopard","arctic fox","arctic wolf","armadillo","arrow crab","asp","baboon","badger","bald eagle","bandicoot","barnacle","barracuda","basilisk","bass","bat","beaked whale","bear","beaver","bedbug","bee","beetle","bird","bison","blackbird","black panther","black widow spider","blue bird","blue jay","blue whale","boa","boar","bobcat","bobolink","bonobo","box jellyfish","bovid","buffalo,african","bug","butterfly","buzzard","camel","canid","cape buffalo","capybara","cardinal","caribou","carp","catshark","caterpillar","catfish","centipede","cephalopod","chameleon","cheetah","chickadee","chicken","chimpanzee","chinchilla","chipmunk","clam","clownfish","cobra","cockroach","cod","condor","constrictor","coral","cougar","cow","coyote","crab","crane","crane fly","crawdad","crayfish","cricket","crocodile","crow","cuckoo","cicada","damselfly","deer","dingo","dinosaur","dolphin","dormouse","dove","dragonfly","duck","dung beetle","eagle","earthworm","earwig","echidna","eel","egret","elephant","elephant seal","elk","emu","ermine","falcon","ferret","finch","firefly","fish","flamingo","flea","fly","flyingfish","fowl","fox","frog","fruit bat","gamefowl","galliform","gazelle","gecko","gerbil","giant panda","giant squid","gibbon","gila monster","giraffe","goldfish","goose","gopher","gorilla","grasshopper","great blue heron","great white shark","grizzly bear","ground shark","ground sloth","grouse","guan","guanaco","guineafowl","gull","guppy","haddock","halibut","hammerhead shark","hamster","hare","harrier","hawk","hedgehog","hermit crab","heron","herring","hippopotamus","hookworm","hornet","hoverfly","hummingbird","humpback whale","hyena","iguana","impala","irukandji jellyfish","jackal","jaguar","jay","jellyfish","junglefowl","kangaroo","kangaroo mouse","kangaroo rat","kingfisher","kite","koala","koi","komodo dragon","krill","ladybug","lamprey","landfowl","land snail","lark","leech","lemming","lemur","leopard","leopon","limpet","lion","lizard","llama","lobster","locust","loon","louse","lungfish","lynx","macaw","mackerel","magpie","mammal","manatee","mandrill","manta ray","marlin","marmoset","marmot","marsupial","marten","mastodon","meadowlark","meerkat","mink","minnow","mite","mockingbird","mole","mollusk","mongoose","monitor lizard","monkey","moose","mosquito","moth","mountain goat","mouse","mule","muskox","narwhal","newt","nightingale","ocelot","octopus","opossum","orangutan","orca","ostrich","otter","owl","ox","panda","panther","panthera hybrid","parakeet","parrot","parrotfish","partridge","peacock","peafowl","pelican","penguin","perch","peregrine falcon","pheasant","pigeon","pike","pilot whale","pinniped","piranha","planarian","platypus","polar bear","pony","porcupine","porpoise","possum","prairie dog","prawn","praying mantis","primate","ptarmigan","puffin","puma","python","quail","quelea","quokka","raccoon","rainbow trout","rat","rattlesnake","raven","batoidea","rajiformes","red panda","reindeer","reptile","rhinoceros","right whale","roadrunner","rodent","rook","rooster","roundworm","saber-toothed cat","sailfish","salamander","salmon","sawfish","scale insect","scallop","scorpion","seahorse","sea lion","sea slug","sea snail","shark","sheep","shrew","shrimp","silkworm","silverfish","skink","skunk","sloth","slug","smelt","snail","snake","snipe","snow leopard","sockeye salmon","sole","sparrow","sperm whale","spider","spider monkey","spoonbill","squid","squirrel","starfish","star-nosed mole","steelhead trout","stingray","stoat","stork","sturgeon","sugar glider","swallow","swan","swift","swordfish","swordtail","tahr","takin","tapir","tarantula","tarsier","tasmanian devil","termite","tern","thrush","tick","tiger","tiger shark","tiglon","toad","tortoise","toucan","trapdoor spider","tree frog","trout","tuna","turkey","turtle","tyrannosaurus","urial","vampire bat","vampire squid","vicuna","viper","vole","vulture","wallaby","walrus","wasp","warbler","water boa","water buffalo","weasel","whale","whippet","whitefish","whooping crane","wildcat","wildebeest","wildfowl","wolf","wolverine","wombat","woodpecker","worm","wren","xerinae","x-ray fish","yak","yellow perch","zebra","zebra finch","animals by number of neurons","animals by size","common household pests","common names of poisonous animals","bali cattle","domestic bactrian camel","domestic canary","domestic dromedary camel","domestic duck","domestic goat","domestic goose","domestic guineafowl","domestic hedgehog","domestic pig","domestic pigeon","domestic rabbit","domestic silkmoth","domestic silver fox","domestic turkey","lab rat","gayal","ringneck dove","siamese fighting fish","society finch"];

const food = ["aloo pie","apple crispapple crumble","apple pie","australian and new zealand meat pie","bacon and egg pie","bakewell tart","banana cream pie","banoffee pie","bean pie","bedfordshire clanger","bisteeyapastilla etc","blackberry pie","black bottom pie","black bun","blueberry pie","bob andy pie","bougatsa","boysenberry pie","bridie","buko pie","bumbleberry pie","bundevara","bndner nusstorte","burek","butter pie","butter tart","buttermilk pie","canel","cantaloupe pie","caramel tart","cashew pie","cheesecake","cheese pie","cherry pie","chess pie","chestnut pie","chicken and mushroom pie","chiffon pie","chinese piept chinois","cobbler","coconut cream pie","cookie cake pie","corned beef pie","coulibiac","cumberland pie","curry pie","curry puff","custard tartflans ptissier","derby pie","egg tart","empanada","fish piefishermans pie","flan","flan chino ","flapper pie","fleischkuekle","flipper pie","fried pie","gibanica","green grape pie","homity pie","hornazo","jamaican patty","kalakukko","karelian pasties","key lime pie","khachapuri","killie pie","knish","kuchen","kurnik","lanttusupikas","lemon ice box pie","lemon meringue pie","manchester tart","meat and potato pie","meat pie","melktert","melton mowbray pork pie","millionaire pie","mince pie","mississippi mud pie","moravian chicken pie","mustard tart","natchitoches meat pie","neenish tart","pomaqechpochmak","pasc","pastafrola","pastel de nata","pasty","peach pie","peanut pie","pear tart","pecan pie","pie  la mode","pirog","pirozhkipirozhok piroshki","pork pie","pot pie","pumpkin pie","quiche","qumeshtore me pete","raisin pie","rappie pie","raspberry pie","razzleberry pie","rhubarb pie","samosasingara sambusac samsa","saskatoonberry pie","sausage roll","scotch pie","seapiecipaille","sfiha","shaker lemon pie","shepherds pie","shoofly pie","soparnik","southern tomato pie","spanakopitaspinach pie","stargazy pie","steak and kidney pie","steak pie","strawberry pie","strawberry rhubarb pie","sugar pie","sweet potato pie","tamale pie","tarta capuchina ","tarta de santiago","tarte conversation","tiropitagreek cheese pie","tocinillo de cielo ","tourtire","treacle tart","vlaai","vsterbotten pie","walnut pie","watalappam","whe","woolton pie","whoopie pie","acar","afghan salad","ambrosia","arab salad","asinan","banana salad ","bean salad","bok lhongbok lahong","caesar salad","cappon magro","celery victor","cheese slaw","chef salad","chicken salad","chilean salad","chinese chicken salad","oban salatas","cobb salad","coleslaw","cookie salad","crab louie","curtido","dressed herring","egg salad","fattoush","fiambre","fruit salad","gadogado","garden salad","glasswort salad","glorified rice","golbaengi muchim","greek salad","ham salad","insalata caprese","israeli salad","jello salad","kachumbari","kachumber","karedok","khao yam","kinilnat","ksr","kosambari","lalab","larb","lyutika","macaroni salad","macedonia salad","mallung","matbucha","mesclun","michigan salad","mimosa salad","mushroom salad","naem khluk","nioise salad","olivier saladrussian salad","panzanella","pao cai","pasembur","pasta salad","pecel","perigourdine","phla mu","piyaz","poke salad","potato salad","raheb","rojak","sevenlayer salad","sabich salad","salat avocado","serbian salad","shepherds salad","shopska salad","shirazi salad","singju","snickers salad","som tamsom tum","szaot","tabbouleh","taco salad","green papaya salad","gi nhch","tam mu yo","tam phonlamai ruam","taramosalata","tuna salad","urap","urnebes","vinegret","waldorf salad","american sub","bacon","bagel toast","baked bean","baloney","barbecue","barros jarpa","barros luco","bauru","beef on weck","beirute","blt","bocadillo","bologna","bosna","bratwurst","breakfast roll","breakfast","british rail","butifarra ","broodje kroket","bun kebab","butterbrot","caprese","carrozza","caviar","cemita","chacarero","cheese","cheese dream","cheese and pickle","cheesesteak","chicken","chicken schnitzel","chickpea salad","chili burger","chimichurris","chip butty","chipped beef","chivito","chocolate","chopped cheese","choripn","chow mein sandwich","churrasco","club","completo","corned beef","crisp","cuban","cucumber","cudighi","grilled cottage cheese sandwich","cutlet sandwich italian","dagwood","deli","denver","doner kebab","donkey burger","doubles","doughnut sandwich","dynamite","dyrlgens natmad","elvis","egg","fairy bread","falafel","farroupilha","fischbrtchen","fish finger","fluffernutter","fools gold loaf","francesinha","francesinha poveira","french dip","fried brain","fruit","ftira","gatsby","gerber","gua bao","guajolota","gudille","grillade","gyro","hagelslag or vlokken","ham","ham and pickle sandwich","ham and cheese","ham and egg bun","hamburger","hamglizzy","har cheong gai burger","horseshoe","hot brown","hot dog","hot chicken","hot turkey","ice cream","indian taco","italian beef","italian","jam","jambonbeurre","jibarito","jucy lucy","kanapka","katsu sando","kabuli burger","kaisers jagdproviant","khao jee pt","kokoretsi","kottenbutter","leberkse","lettuce","limburger","lobster roll","lox","luther burger","mallorca de jamn y queso","marmalade","marmite","martino","meatball","medianoche","melt","mettbrtchen","mitraillette","mollete","montadito","monte cristo","montrealstyle smoked meat","mortadella","motherinlaw","muffuletta","naan","obloen chlebky","openfaced","pambazo","panbagnat","panini","pastrami on rye","patty melt","peameal bacon sandwich","peanut butter and jelly","peanut butter banana and bacon sandwich","pebete","pepito","pepper and egg","pepper and egg italian","pilgrim","pimento cheese","pistolette","pljeskavica","po boy","polish boy","porchetta","porilainen","pork chop bun","pork roll sandwich","pork tenderloin","prawn roll","prego","primanti","prosperity sandwich","pudgy pie","pulled pork","queen alexandras sandwich","rachel","reuben","roast beef","roti bakar","roti john","rou jia mo","ruisleip","runza","sabich","sailor","sndwich de milanesa","sandwich loaf","de miga","salt beef bagel","sausage","schmitter","sealed crustless","shawarma","shooters sandwich","shuco","slider","sloppy joe","sloppy joe ","smrgstrta","smrrebrd","sol over gudhjem","souvlaki","spaghetti","specials deli sandwiches","spiedie","st paul","steak bomb","steak burger","steak","submarinesubbaguette","tavern","tea","toast","toast hawaii","toastie","tofu","tongue toast","torta","torta ahogada","tramezzino","trancapecho","tripleta","tuna","turkey devonshire","vada pav","vegemite","vegetable","veggie burger","bitterballen","bonda","cereal ","cokodok","cracker nuts","crpe","croquette","doughnut ","gulha","khanom buang","pakora","pancakes","parippu vada","pazham pori","pizza ","poffertjes","pretzel soft","telebhaja ","uzhunnu vada","waffle","brittle","imli candy","bubblegum","candy","chocolate ","chocolate bar ","chocolate rugelach","chocolate truffle","fudge","geplak","grass jelly","marshmallow","marzipan","nougat","panforte","pudding ","rice krispie treats","smores","toffee","turkish delight","arrowroot","chebakia","chocolate chip cookie","cookie ","ginger snaps","graham crackers","oatmeal cookie","peanut butter cookie","gansito","jaffa cakes","snack cake","churros","fruit bun","pastry ","scones","snack pie ","toaster pastry ","amazake","atole","coffee","colada morada","energy drinks ","flavored milk","horchata","juice","kefir","malted milk","milkshake","root beer","root beer float","sikhye","soft drinks","smoothie ","sports drinks ","tamagozake","tejuino","frozen custard","ice cream ","ice pop","achappam","ada","dolma","french fries","hummus","instant soup ","khandvi ","kuzhalappam","meze","nian gao","onion rings ","piattos","sesame sticks","sev mamra","spring roll ","tahini","tapas","tempura","unniyappamkuzhiyappam","yogurt ","energy bar ","flapjack","granola bar ","bagel ","bread ","buterbrod","croissant ","croutons ","fried bake","guabao","houska ","lavash","open sandwich ","pasta","sandwich ","tea sandwich","tortilla","totopo","american cheese","cheese ","cream cheese","korbiky","oaxaca cheese","obatzda","parmesan cheese","processed cheese","string cheese","banana chip","cheese puff","chifle","corn chips","corn nuts ","fish and shrimp chips","multigrain snacks ","nachos","pita chips","pork rind ","potato chips ","pretzel hard ","snack mix","tortilla chips ","animal cracker","arare","bagel chips","crackers ","hardtack","knckebrd","oyster cracker","rice cracker ","senbei ","soda cracker","water biscuit","i kfte","corn dog","dried cuttlefish","dried fish ","dried squid ","fish such as fried fish ","hot dogs","jerky ","kibbeh nayyeh","omelet","oysters ","pickled herring ","soused herring","bombay mix","cup noodles","instant noodles ","ramen","aguadito","ajiaco","aorda","acquacotta","amish preaching soup","anal kzl soup","ashe doogh","avgolemono","avocado soup","bacon soup","bak kut teh","bakso","barley","beef noodle soup","beer soup","bergen fish soup","binignit","birds nest soup","borscht","bouillabaisse","bouillon ","bouroubourou","bread soup","brenebon","brown veal","brown windsor soup","bun bo hue","buridda","butajiru","cabbage soup kapusniak kapustnica zelnacka","caldillo de congrio","caldillo de perro","caldo verde","callaloo","canh chua","canja de galinha","carp soup ","carrot soup","cazuela","chestnut bisque","chicken noodle soup","chicken soup","chicken vegetable soup","chupe","chupe andino","cioppino","cockaleekie","cold borscht  altibariai","consomm","corn chowder","crab bisque","cream of apple soup","cream of asparagus","cream of broccoli","cream of celery","cream of chicken","cream of potato","cream of tomato","cream of crab","cream of mushroom","crme ninon","cucumber soup","cullen skink","curry mee","dalithoy","dashi","dillegrout","duck soup noodles","egg drop soup","egusi soup","ezogelin soup","fabada asturiana","fanesca","fish soup bee hoon","fish","fishermans soup","french onion soup","frittatensuppe","fruktsoppa","fufu and egusi soup","fumet","garmugia","gazpacho","ginataan","ginestrata","goat meat pepper soup","gogi guksu","golden mushroom","gomguk","goulash soup","ground nut soup","kimchi guk","gumbo","harira","hot and sour soup","slensk kjtspa","joumou","kharcho","kusksu","kwti","laksa","lagman","leek soup","lettuce soup","lentil soup","lobster stew","lobster bisque","loglog","lohikeitto","lung fung soup","lyvzha","maccu","manhattan clam chowder","maryland crab soup","matzah ball soup","melon soup","minestrone","miso soup","miyeok guk","mohinga","mote de queso","mulligan stew","mulligatawny","naengmyeon","nettle soup","new england clam chowder","nikujaga","okra soup","okroshka","oxtail soup","palm nut soup","panada","panadelsuppe","pasta fagioli","yellow pea soup","peanut soup","philadelphia pepper pot","ph","pickle soup","pork blood soup","pozole","psarosoupa ","pumpkin","rasam","rassolnik","rawon","rishtay  rqaq o adas","rumfords soup","saimin","salmorejo","sambar","samgyetang","sayur asem","sayur lodeh","scotch broth","shark fin soup","shchav sorrel soup green borscht green shchi","shchi","seafood chowder","shecrab soup","shrimp bisque","sliced fish soup","snert","solyanka","sop saudara","sopa de gato","soto","soto ayam","soup alla canavese","soup no 5","sour cherry soup","sour rye soup white borscht ur","sour soup ","spinach soup","split pea","squash bisque","stone soup","sup kambing","stracciatella","swedish fruit soup","taco soup","talbina","tng fn","tng min","tapado","tarator","tarhana","tekwan","tinola","tom yum","tomato bisque","tomato soup","tongseng","tortilla soup","tteokguk","turkey soup","ukha or yushka","vegetable soup","vichyssoise","vori vori","waterzooi","wedding soup","white beef","white veal","wine soup","winter melon","aj de gallina","alicot","andrajos","asam pedas","balbacua","bamia","beef bourguignon","beef stroganoff","bicol express","bigos","birnen bohnen und speck","birria","blanquette de veau","booyah","bosnian pot","brongkos","brudet","brunswick stew","buseca","buddha jumps over the wall","buu kebab","burgoo","cabbage stew","cacciucco","cachupa","caldeirada","caldereta de cordero","caldo av","caldo gallego","callos","caparrones","capra e fagioli","carbonade flamande","carne mechada","cassoulet","cawl","chairo","chakapuli","chapea","chicken mull","chili con carne","cholent","ciambotta","cincinnati chili","cocido lebaniego","cocido madrileo","cocido montas","compote","corn stew","coq au vin","cotriade","cozidococido","daube","dimlama","dinuguan","drokpa katsa","escudella i carn dolla","touffe","fabes con almejas","fahsa","frikl","fasole cu crnai","feijoada","fesenjn","flaki","fzelk","fricot","gaisburger marsch","galinhada","garbure","ghapama","ghormeh sabzi","goat water","goulash","guatitas","gve","guyana pepperpot","hachee","hasenpfeffer","hochepot","hoosh","hot pot","irish stew","islim or patlcan kebab","istrian stew","kadhi","kaldereta","kamounia","kapuska","karekare","karelian hot pot","kig ha farz","kuru fasulye","lancashire hotpot","lskisoosi","lecs","locro","lunggoi katsa","maafe","maconochie","mechado","mjave lobio","moambe","mocot","molagoottal","moqueca","navarin","ndol","oil down","olla podrida","ollada","ostrich stew","ostropel","oyster stew","paila marina","palaver sauce","paomo","pasulj ","pichelsteiner","pinangat","piperade","pisto","prklt","potaufeu","potjiekos","pottage","puchero","qoiri","rabbit stew","ragout","ratatouille","red cooked pork","rssypottu","rogan josh","rubaboo","sagamite","saksang","saltah","scouse","seco","sekba","semur","shiro","sinigang","skirts and kidneys","sonofabitch stew","stew peas","sulu kfte","tajine","tas kebap","tatws pum munud","tharid","tocan","tomato bredie","tombet","tuna pot","carpaccio","ceviche","crudo","eia ota","esqueixada","gravlax","gohu ikan","hinava","hoe","kelaguen","kilawin","koi pla","kokoda","kuai","lakerda","lap palarb pla","namer","ota ika","poke","sashimi","soused herring ","stroganina","tiradito","tuna tartare","umai","xato","yusheng","angels on horseback","antipasto","bakwan","batagor","batata vada","barbajuan","blooming onion","bruschetta","buffalo wing","canap","chaat","chicken fingers","chicken lollipop","crab puff","crab rangoon","crostini","crudits","dahi puri","dahi vada","deviled eggs","devils on horseback","eggplant salads and appetizers","fried mushrooms","garlic knot","haggis pakora","jalapeo popper","ketoprak","lumpia","malakoff","martabak","mozzarella sticks","onion ring","paneer tikka","panipuri","papadum","papri chaat","pigs in a blanket","perkedel","pizzetta","potato skins","potato wedges","prawn cocktail","pu pu platter","queso flameado","rocky mountain oysters","rumaki","saganaki","sakinaluchakli","samosa","salmon tartare","serabi","stuffed mushrooms","sushi","tokwat baboy","zakuski","100 grand bar","3 musketeers","3 musketeers truffle crisp","5th avenue","5 star","aero","aero caramel","aero mint","aero orange","after eight","air delight","albeni","alberts ice cubes","almond joy","amul chocolate","baby ruth","balisto","bar none","bar one","big turk","boost","bounty","bournville","breakaway","bros","bros puur","bubu lubu","bun","butterfinger","cadbury dairy milk","cadbury darkmilk","cadbury fruit & nut","cadbury tempo","caramello","caramello koala","caramilk","caravan","carlos v","catch bar","charleston chew","cherry ripe","cherry mash","chokito","chomp","chunky","clark bar","coffee crisp","coffee crisp orange","cow chocolate","crachi","cri-cri","crispy crunch","crunch","crunchie","crunky","cup-o-gold","curly wurly","dagoba chai chocolate","daim","double decker","dove bar","dream","drifter","duncans","eat-more","encore!","excellence","five star caramel","flake","forever yours","freddo","frys chocolate cream","frys turkish delight","galaxy","galaxy caramel","galaxy ripple","glosette","golden rough","goobers","googoo cluster","grand slam","green and blacks","hail","happy hippo","haviland thin mints","haviland wintergreen patty","heath bar","hershey bar","hershey bar with almonds","hershey almond toffee bar","hersheys creamy caramel","hersheys kisses","hersheys special dark","holly bar","idaho spud","intense orange","ivory mountain","jacek","jersey milk","junior caramels","karl fazer milk chocolate","kinderkinder bueno","kit kat","korkunov chocolate bars","krackel","krembanan","kvikk lunsj","la fama","leah bar","lindor","lion bar","lion peanut","lottes ghana","lunch bar","m&s","m-azing","macadamia","macadamia nut","maestro","malagos","maracaibo 65","marathon","marble chocolate","mars bar","mars bar lava","meiji almond","mekupelet","menthe","milk shake","milka","milky bar","milky way","milky way midnight","milo bar","mint krokant","mirage","moka","moro","mounds","mountain bar","mousse","mr. big","mr. goodbar","munchies","neapolitan coconut slice","nestle crunch","nestlé milk chocolate","nestlé triple decker bar","nestle white","nickel lunch","noisette","nougatti","nut goodie","nut lovers","nutrageous","nuts","oh henry","old faithful","pal-o-mine","pb max","peanut slab","penguin","pep","peppermint crisp","perky nana","pesek zman","picnic","pistache","pistachio and rose petal chocolate bar","polly waffle","powerhouse","prince","prince polo","princessa","ragusa","raider","rally bar","reeses crispy crunchy bar","reeses fast break","reeses peanut butter cups","reeses sticks","ritter sport","rocky road","rolo","safari","salted pretzel","sarris chocolate covered pretzels","sasha chocolate goldleaf","skor","sky bar","smooth sailin","snickers","snik snak","spira","starbar","sublime","sweet marie","swirled caramel & salted peanut","take 5","tango","tim tam","time out","tin larin","toak chocolate","toblerone","toffee crisp","toffifee","tonys chocolonely","top deck","topvalu","topic","torino","túró rudi","turtles","twin bing","twirl","twix","u-no bar","vice versas","violet crumble","walnut crush","welchs fudge","whatchamacallit","whip","white knight","whittakers","willocrisp","wispa","wonka bar","wonka mud sludge","woodies","wunderbar","yankie bar","york bar","york peppermint pattie","yorkie","zero bar","acidophiline","amasi","appam","atchara","ayran","bagoong","bagoong monamon","bagoong terong","balao-balao","bánh cuốn","beer","blaand","boza","bread","brem","burong isda","burong mangga","burong talangka","buttermilk","calpis","chass","cheonggukjang","chicha","chinese pickles","cincalok","cocoa","cod liver oil ","crème fraîche","dhokla","doenjang","doogh","dosa","doubanjiang","douchi","douzhi","fermented bean curd","fermented bean paste","fermented fish","fermented milk products","filmjölk","fish sauce","ganjang","garri","garum","gejang","gochujang","gundruk","hákarl","hongeohoe","idli","igunaq","injera","iru ","jeotgal","jogijeot","kapusta kiszona duszona","katsuobushi","kaymak","kenkey","ketchup","khanom chin","kimchi","kiviak","kombucha","kumis","kusaya","kuzhi paniyaram","kvass","lassi","leben ","lufu ","mageu","meigan cai","miso","mixian ","mohnyin tjin","murri ","mursik","myeolchijeot","nata de coco","nata de piña","nattō","nem chua","ngapi","ogi ","ogiri","oncom","palappam","pesaha appam","peuyeum","pickles","podpiwek","poi ","pon ye gyi","portuguese ground red pepper ","pulque","puto","rakfisk","rượu nếp","ryazhenka","saeujeot","salami","sauerkraut","şalgam","shark meat","shiokara","shrimp paste ","sinki ","skyr","smântână","smetana ","som moo","sour cabbage","sour cream","soured milk","sowans","soy sauce","ssamjang","stinky tofu","strained yogurt","suan cai","sumbala","surströmming","taba ng talangka","tabasco sauce","tapai","tempeh","tesgüino","tianjin preserved vegetable","tianmianjiang","tibicos","tsukemono","tương","tungrymbai","viili","vinegar","wine","white sugar sponge cake","worcestershire sauce","yakult","yellow soybean paste","yogurt","yongfeng chili sauce","zha cai","chakuli pitha","enduri pitha","albacore","alewife","amberjack","anchovy","angelfish","ballyhoo","barracuda","atlantic pomfret","bass","bigeye ","blackfish","blacksmith","blue marlin","blueback","bluefish","bluegill","bocaccio","bombay duck","bonefish","bonito","bowfin","bream","brill","broadbill","buffalo fish","butter fish","butterfly fish","cabrilla","calico bass","capelin","carp","carpsucker","cero","channel bass","char","chilean sea bass","chilipepper ","chup","cichlid","cigarfish","cisco","coalfish","cobia, cabio, or black bonito","cod","common snook","corbina, corvina","cottonwick","crappie","creville","croacker","crucian carp","cubbyu","cunner","dab","damselfish","doctorfish","eulachon","flounder","flatfish","fluke","flyingfish","frostfish","gag grouper mycteroperca microlepis","giant kelpfish","gizzard shad","goatfish","gobies","goldeye","goldfish","grayling","graysby","greenling","grouper","grunion","grunt","guavina","haddock","hake","halfbeak","halfmoon","halibut","hamlet ","harvestfish","hawkfish","herring","hind","hogchoker","hogfish","hoki","horse mackerel","jack mackerel","jacks and pompanos","jacksmelt","john dory","kelpfish","kingfish","ladyfish","lafayette","lake herring","largemouth bass","lingcod","lizardfish","lookdown","mackerel","mahimahi","margate","menhaden","menpachii","merluccio","milkfish or awa","mojarras","mooneye","moonfish","mossbunker","mullet","muskellunge","mutton hamlet","muttonfish","needlefish","opaleye","palometa","parrotfish","patagonian toothfish","perch","permit","pickerel","pigfish","pike","pikeperch","pilchard","pinfish","plaice","pollock","pomfret","pompano","porgies and sea bream","porkfish","poutassou","prickleback","queenfish","quillback","redfish","roach","rock bass","rockhind","rockfish","rose fish","rohu", "labeo rohita","rudderfish","sablefish","saithe","salmon","sardine","sargo","sauger","scad","scorpionfish","scup","sea bass","sea chubs","sea perch","sea robin","sea trout","shad","sheepshead","sierra","silverside","skipjack","smallmouth bass","smelts","bluestripe snapper","snappers","sole","spadefish","spanish mackerel","spearing","splittail","spot","sprat","squawfish","squirrelfish","steelhead","striped bass","sucker","sunfish","surfperch","surgeonfish","tarpon","tautog","temperate bass","tench","tenpounder","threadfin","tigerfish","tilapia","tilefish","tomcod","topsmelt","tripletail","trout","turbot","wahoo","walleye","walleye pollock","warmouth","weakfish","white fish","whiting","wrasse","yellowtail","yellowtail snapper","barbine","bavette","bigoli","bucatini","busiate ","capellini","fedelini","ferrazuoli","fettuccine","fileja","linguine","lagane","lasagna","lasagnette","lasagnotte","maccheroni alla molinara","maccheroncini di campofilone","mafalde","matriciani","pappardelle","perciatelli","pici","pillus","rustiche","sagne ncannulate","scialatelli or scialatielli","spaghetti alla chitarra","spaghettini","spaghettoni","stringozzi","su filindeu","tagliatelle","taglierini","trenette","tripoline","vermicelli","ziti","anelli","boccoli","calamarata","campanelle or torchio","cappelli da chef","casarecce","castellane","cavatappi","cavatelli","chifferi","cicioneddos","conchiglie","creste di galli","fagioloni","farfalle","fazzoletti","festoni","fiorentine","fiori","fusilli","fusilli bucati","garganelli","gemelli","gnocchi","gomiti","lanterne","lorighittas","macaroni","maccheroncelli","mafaldine","maltagliati","malloreddus","mandala","marille","mezzani","mezze maniche","mezze penne","mezzi bombardoni","nuvole","paccheri","passatelli","pasta al ceppo","penne","penne ricce","picchiarelli","pipe rigate","pizzoccheri","quadrefiore","radiatori","riccioli","ricciolini","ricciutelle","rigatoncini","rigatoni","rombi","rotelle","sagnette","sagnarelli","sedani","spirali","spiralini ","strapponi","strozzapreti","testaroli","tortiglioni","treccioni","trenne","trofie","tuffoli","vesuvio","cencioni","corzetti","fainelle","foglie dulivo","orecchiette","acini di pepe","anellini","conchigliette","corallini","ditali","egg barley","farfalline","fideos","filini","fregula","funghini","gramigne","grattini","grattoni","midolline","occhi di pernice","orzo","pastina","piombi","ptitim","puntine","quadrettini","sorprese","stelle","stortini","tripolini","alphabet pasta","agnolotti","caccavelle","cannelloni","cappelletti ","caramelle","casoncelli","casunziei","conchiglioni","culurgiones","fagottini","lumache","mezzelune","occhi di lupo","pansotti","ravioli","rotolo ripieno","sacchettoni","tortelli","tortellini","tortelloni","tufoli","canederli","donderet","abiu","apple","atemoya","avocado","banana and plantains","barbados cherry","blackberry","black sapote","blueberry","bunch grape","caimito","canistel","cantaloupes and muskmelons","carambola","chestnut","chinese jujube","coconut palm","eugenia","fig","grape","guava","huckleberry","jackfruit","jojoba","longan","loquat","lychee","mamey sapote","mamoncillo","mango","monstera","muscadine grape","naranjillo","natal plum","nectarine","olive trees","oranges","oriental persimmon","papaya","passion fruit","peach, plum and nectarine production","peanut production","pear","pecan","pejibaye","persimmon","pineapple","pineapple guava","pitaya","plum","pomegranate","raspberry","sapodilla","seagrape","spondias","strawberries","sugar apple","tamarind","watermelon","white sapote"];
const queryTemplates = [
  {
    template: 'how fast can a $1 run',
    types: ['animal'],
  },
  {
    template: '$1 net worth',
    types: ['person'],
  },
  {
    template: 'who is $1',
    types: ['person'],
  },
  {
    template: 'weight of average $1',
    types: ['animal'],
  },
  {
    template: 'picture of $1',
    types: ['animal'],
  },
  {
    template: 'picture of $1',
    types: ['person'],
  },
  {
    template: '$1 $2',
    types: ['person', 'socialMedia'],
  },
  {
    template: '$1 calories',
    types: ['food'],
  },
  {
    template: 'recipe with $1',
    types: ['food'],
  },
];

const types = {
  animal: animals,
  person: people,
  food: food,
  socialMedia: socialMedias,
};
/**
 * Adds a listener to changed storage values. `storage`
 * will be updated or the associated callback function (`cb`)
 * will be called whenever a change occurs to the storage values.
 * The storage values change when a user interacts with the extension's popup.
 *
 * @param {Array<string | Object>} storageKeys Array of storage "keys" which are hooked. If the element is a string, it is a storage key.
 *   If the element is an object, it has a `key` field (string) and a `cb` field (function).
 *   `cb` will be called with the new value and `storage` will not be set for this element (that is up to the caller).
 * @param {Object} storage Object of storage values
 */
function hookStorage(storageKeys, storage) {
  chrome.storage.onChanged.addListener(res => {
    if (chrome.runtime.lastError) {
      return;
    }
    storageKeys.forEach(storageKey => {
      // it's either a string or an object of the form { key, cb }
      if (typeof storageKey === 'string') {
        if (res[storageKey] !== undefined) storage[storageKey] = res[storageKey].newValue;
      } else {
        const { key, cb } = storageKey;
        if (res[key] !== undefined) cb(res[key].newValue);
      }
    });
  });
}

/**
 * Similar to hookStorage, except the storage values are retrieved immediately and only once.
 * Also returns a Promise for convenience.
 *
 * @param {Array<string | Object>} storageKeys
 * @param {Object?} storage
 *
 * @returns {Promise<Object>} Promise which resolves to a mapping of storage key to the value
 */
async function getStorage(storageKeys, storage) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(storageKeys.map(key => (typeof key === 'string' ? key : key.key)), res => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(storageKeys.reduce((acc, storageKey) => {
        // it's either a string or an object of the form { key, cb }
        if (typeof storageKey === 'string') {
          if (!storage) return { ...acc, [storageKey]: res[storageKey] };
          if (res[storageKey] !== undefined) storage[storageKey] = res[storageKey];
          else storage[storageKey] = constants.DEFAULT_PREFERENCES[storageKey];
          return { ...acc, [storageKey]: res[storageKey] };
        }
        const { key, cb } = storageKey;
        cb(res[key]);
        return { ...acc, [key]: res[key] };
      }, {}));
    });
  });
}

/**
 * Sets a local storage value or set of values.
 * @param {string | Object} keyOrMap Either a string (representing a key, in which case val must be provided)
 *   or an object with key-value-pair mappings for storing.
 * @param {any?} val The value associated with key, iff key is a string.
 */
async function setStorage(keyOrMap, val) {
  return new Promise((resolve, reject) => {
    const options = typeof keyOrMap === 'string'
      ? { [keyOrMap]: val }
      : keyOrMap;
    chrome.storage.local.set(options, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve();
    });
  });
}
const prefKeys = Object.keys(constants.DEFAULT_PREFERENCES);
const prefs = { ...constants.DEFAULT_PREFERENCES };
hookStorage(prefKeys, prefs);
// other scripts which depends on the global prefs object can use
// "await prefsLoaded" so that the prefs are guaranteed to be loaded before use
const prefsLoaded = getStorage(prefKeys, prefs);
let dailyTrendQueries = [];
// the is the set of available queries which can be used future queries
// and this set should be reset upon it becoming empty (reuse past queries)
let availableQueries = [];
// store usedQueries as a JSON hash map instead of Set or Array for efficiency
// and because chrome.storage will not serialize a Set object
let usedQueries = {};

function addToAvailableQueries(queries) {
  availableQueries = removeDuplicates(availableQueries.concat(queries));
}

function getCustomQueriesArray(queries) {
  return queries.trim().split('\n').filter(q => q);
}

async function updateQueries() {
  await prefsLoaded;

  availableQueries = [];
  if (prefs.searchWithCustomQueries) {
    addToAvailableQueries(getCustomQueriesArray(prefs.customQueries));
  }
  if (prefs.searchWithDailyTrends) {
    addToAvailableQueries(dailyTrendQueries);
  }

  remove(availableQueries, q => usedQueries[q]);
}

async function fetchDailyTrendQueries() {
  try {
    function handleResult(result) {
      // 6 is to remove the malformed `)]}', ` at the beginning of the response
      const json = JSON.parse(result.substring(6));
      return json.default.trendingSearchesDays.map(day => {
        return day.trendingSearches.map(search => search.title.query.toLowerCase());
      }).flat().filter(q => q);
    }

    // fetch the last X days to get a fair number of queries to pull from
    const results = await Promise.all(
      new Array(constants.NUM_DAILY_TREND_FETCHES).fill().map((_, i) => {
        // don't worry about timezone shifts here. shouldn't matter if we're off by a day on the API calls.
        let date = new Date(Date.now() - i * constants.ONE_DAY_MILLIS);
        date = date.toISOString();
        date = date.substring(0, date.indexOf('T')).replace(/-/g, '');
        return fetch(`${constants.DAILY_TRENDS_API}&ed=${date}`)
          .then(r => {
            if (!r.ok) throw new Error('Fetching daily queries failed');
            return r.text();
          })
      }),
    );
    dailyTrendQueries = results.map(handleResult).flat();
    setStorage('lastDailyTrendFetch', Date.now());
    setStorage('dailyTrendQueries', dailyTrendQueries);
    // fetch again in 1 day
    chrome.alarms.create(constants.ALARMS.FETCH_DAILY_TRENDS, {
      periodInMinutes: constants.ONE_DAY_MINS,
    });
  } catch (err) {
    // log the error, but do nothing and default to the hardcoded queries
    console.error(err);
  }
}

const queriesAreAvailable = getStorage(['lastDailyTrendFetch', 'dailyTrendQueries', 'usedQueries']).then(async res => {
  usedQueries = res.usedQueries || {};
  if (!res.lastDailyTrendFetch || Date.now() - res.lastDailyTrendFetch > constants.ONE_DAY_MILLIS) {
    await fetchDailyTrendQueries();
  } else {
    dailyTrendQueries = res.dailyTrendQueries;
  }
  await updateQueries();
});

async function addUsedQuery(query) {
  await queriesAreAvailable;

  usedQueries[query] = true;
  setStorage('usedQueries', usedQueries);

  remove(availableQueries, q => q === query);
  // reset the available queries when empty
  if (availableQueries.length === 0) {
    usedQueries = {};
    setStorage('usedQueries', usedQueries);
    updateQueries();
  }
}

function isQueryUsed(query) {
  return usedQueries && usedQueries[query];
}

function getRandomLetters() {
  return Math.random().toString(36).substr(2);
}

async function getSearchQuery() {
  await prefsLoaded;

  if (prefs.randomLettersSearch) return getRandomLetters();

  // try using an available query. if there are none, just fallback to the hardcoded queries
  if (availableQueries.length) {
    const query = getRandomElement(availableQueries);
    addUsedQuery(query);
    return query;
  }

  if (!prefs.searchWithTemplates) return getRandomLetters();

  const queryTemplate = getRandomElement(queryTemplates);
  const variables = queryTemplate.template.match(/(\$\d+)/g); // variables are $1, $2, ... where the digit is the ID of the variable
  const query = variables.reduce((acc, variable, i) => {
    const type = queryTemplate.types[i];
    const value = getRandomElement(types[type]);
    return acc.replace(variable, value);
  }, queryTemplate.template);

  return query;
}

hookStorage(['customQueries', 'searchWithCustomQueries', 'searchWithDailyTrends', 'searchWithTemplates'].map(key => ({
  key,
  cb: updateQueries,
})));

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name === constants.ALARMS.FETCH_DAILY_TRENDS) {
    await fetchDailyTrendQueries();
    updateQueries();
  }
});
function setBadgeReminder() {
  chrome.action.setBadgeText({ text: constants.BADGE_REMINDER_TEXT });
  chrome.action.setBadgeBackgroundColor({ color: constants.BADGE_COLORS.REMINDER });
}

/**
 * Meant to be called after every search (hooked on lastSearch storage value).
 */
function updateReminderTimeout(lastSearch) {
  const timeSinceLastSearch = Date.now() - lastSearch;
  if (!lastSearch || timeSinceLastSearch > constants.ONE_DAY_MILLIS) {
    setBadgeReminder();
    chrome.alarms.clear(constants.ALARMS.REMINDER);
    return;
  }
  clearBadge();
  // will overwrite existing alarm
  chrome.alarms.create(constants.ALARMS.REMINDER, {
    when: lastSearch + constants.ONE_DAY_MILLIS,
  });
}

hookStorage([{
  key: 'lastSearch',
  cb: updateReminderTimeout,
}]);

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === constants.ALARMS.REMINDER) setBadgeReminder();
});

function initiateReminderScript() {
  getStorage([{
    key: 'lastSearch',
    cb: updateReminderTimeout,
  }]);
}

// don't need to fetch the storage every time the background page becomes inactive and then active again.
// just fetch it on startup, do the initial check for the reminder,
// and then hook into the storage value for subsequent reminder updates.
chrome.runtime.onInstalled.addListener(initiateReminderScript);
chrome.runtime.onStartup.addListener(initiateReminderScript);
const mobileUserAgent = getRandomElement(constants.MOBILE_USER_AGENTS);
const edgeUserAgent = constants.EDGE_USER_AGENT;

let spoofUserAgent = false;
let doMobileSearches = false;

// TODO: have these functions set storage values, instead of local variables, once we
// rewrite this to be a non-persisted script (currently persisted due to blocking web requests)
function spoof(value) {
  spoofUserAgent = value;
}
function mobileSpoof(value) {
  doMobileSearches = value;
}

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
  const { requestHeaders } = details;
  requestHeaders.forEach(header => {
    if (header.name === 'User-Agent' && spoofUserAgent) {
      if (doMobileSearches) header.value = mobileUserAgent;
      else header.value = edgeUserAgent;
    }
  });
  return { requestHeaders };
}, {
  urls: ['https://*.bing.com/*'],
}, ['blocking', 'requestHeaders']);
function sendMessage(msg) {
  if (activePort) activePort.postMessage(msg);
}

function setBadgeReminderWithCount(count) {
  chrome.action.setBadgeText({ text: count.toString() }); // must be a string type
  chrome.action.setBadgeBackgroundColor({ color: constants.BADGE_COLORS.COUNT });
}

function updateLastSearch() {
  setStorage('lastSearch', Date.now());
}

// store it in an object because eventually, we will be storing this information in local storage
// and once that happens, it will be an object as well
let currentSearchSettings = {
  // currentSearchingTabId,
  // platformSpoofing,
  // desktopIterations,
  // mobileIterations,
  // overallCount,
  // desktopCount,
  // mobileCount,
};
let searchTimeout;

function stopSearches() {
  currentSearchSettings = {};
  clearTimeout(searchTimeout);
  clearBadge();
  sendMessage({ type: constants.MESSAGE_TYPES.CLEAR_SEARCH_COUNTS });
  spoof(false);
  mobileSpoof(false);
}

function setSearchCounts() {
  const {
    currentSearchingTabId,
    overallCount,
    desktopCount,
    mobileCount,
    desktopIterations,
    mobileIterations,
    platformSpoofing,
  } = currentSearchSettings;
  if (!currentSearchingTabId) {
    sendMessage({ type: constants.MESSAGE_TYPES.CLEAR_SEARCH_COUNTS });
    return;
  }

  const containsDesktop = platformSpoofing.includes('desktop');
  const containsMobile = platformSpoofing.includes('mobile');
  const desktopRemaining = desktopIterations - desktopCount;
  const mobileRemaining = mobileIterations - mobileCount;

  sendMessage({
    type: constants.MESSAGE_TYPES.UPDATE_SEARCH_COUNTS,
    numIterations: desktopIterations + mobileIterations,
    overallCount,
    containsDesktop,
    containsMobile,
    desktopRemaining,
    mobileRemaining,
  });
}

/**
 * Actually redirects to perform search query.
 */
async function search(isMobile) {
  await prefsLoaded;
  if (!currentSearchSettings) return;

  const {
    desktopCount,
    mobileCount,
    currentSearchingTabId,
  } = currentSearchSettings;

  if (isMobile && mobileCount === 0) mobileSpoof(true);

  return new Promise(async (resolve, reject) => {
    const query = await getSearchQuery();
    chrome.tabs.update(currentSearchingTabId, {
      url: `https://bing.com/search?q=${query}`,
    }, () => {
      // we expect an error if there is the tab is closed, for example
      if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);

      if (prefs.blitzSearch) {
        // arbitrarily wait 500ms on the last mobile search before resolving
        // so that there is a delay before disabling the mobile spoofing
        // (otherwise the last search will occur after the spoofing is disabled)
        const delay = (mobileCount === desktopCount && desktopCount > 0) ? 500 : 0;
        setTimeout(resolve, delay);
        return;
      }

      function listener(updatedTabId, info) {
        if (currentSearchingTabId === updatedTabId && info.status === 'complete') {
          resolve();
          chrome.tabs.onUpdated.removeListener(listener);
        }
      }
      chrome.tabs.onUpdated.addListener(listener);
    });
  });
}

/**
 * Computes the data we need to make our searches, invokes the search function,
 * and schedules another search in the future (after some delay).
 */
async function searchLoop(currentSearchingTabId) {
  await prefsLoaded;

  let {
    platformSpoofing,
    desktopIterations,
    mobileIterations,
    overallCount,
    desktopCount,
    mobileCount,
  } = currentSearchSettings;

  let currentDelay = Number(prefs.delay);
  if (prefs.randomSearch) {
    const minDelay = Number(prefs.randomSearchDelayMin);
    const maxDelay = Number(prefs.randomSearchDelayMax);
    currentDelay = random(minDelay, maxDelay);
  }

  try {
    const isMobile = platformSpoofing === 'mobile-only' || (platformSpoofing === 'desktop-and-mobile' && overallCount >= desktopIterations);
    await search(isMobile);

    // This is to address the issue where you stop the searches while the page is loading (or start searches in another tab)
    // and we are awaiting the search to complete. The timeout function is async, so even if the timeout has been cleared,
    // once the promise finishes, it will invoke another search. So, we check after done waiting for if the search has completed.
    if (currentSearchSettings.currentSearchingTabId !== currentSearchingTabId) return;

    overallCount++;
    if (isMobile) mobileCount++;
    else desktopCount++;
    Object.assign(currentSearchSettings, {
      overallCount,
      desktopCount,
      mobileCount,
    });

    setSearchCounts();
    setBadgeReminderWithCount(desktopIterations + mobileIterations - overallCount);

    if (overallCount >= desktopIterations + mobileIterations) {
      stopSearches();
    } else {
      // cannot use chrome.alarms since an alarm will fire, at most, every one minute
      searchTimeout = setTimeout(() => searchLoop(currentSearchingTabId), currentDelay);
    }
  } catch (err) {
    console.error(err.message);
    stopSearches();
  }
}

/**
 * Computes/stores the search settings which will be used, then invokes the first search loop.
 */
async function startSearches(tabId) {
  stopSearches();

  await prefsLoaded;
  updateLastSearch();

  const { platformSpoofing } = prefs;
  const minInterations = Number(prefs.randomSearchIterationsMin);
  const maxIterations = Number(prefs.randomSearchIterationsMax);
  let desktopIterations = prefs.randomSearch ? random(minInterations, maxIterations) : Number(prefs.desktopIterations);
  let mobileIterations = prefs.randomSearch ? random(minInterations, maxIterations) : Number(prefs.mobileIterations);

  // send messages over the port to initiate spoofing based on the preference
  if (platformSpoofing === 'none' || !platformSpoofing) {
    spoof(false);
    mobileSpoof(false);
    mobileIterations = 0;
  } else if (platformSpoofing === 'desktop-and-mobile') {
    spoof(true);
    mobileSpoof(false);
  } else if (platformSpoofing === 'desktop-only') {
    spoof(true);
    mobileSpoof(false);
    mobileIterations = 0;
  } else if (platformSpoofing === 'mobile-only') {
    spoof(true);
    mobileSpoof(true);
    desktopIterations = 0;
  }

  Object.assign(currentSearchSettings, {
    currentSearchingTabId: tabId,
    platformSpoofing,
    desktopIterations,
    mobileIterations,
    overallCount: 0,
    desktopCount: 0,
    mobileCount: 0,
  });

  setSearchCounts();
  searchLoop(tabId);
}
function startSearchesInNewTab() {
  chrome.tabs.create({ active: false }, tab => {
    startSearches(tab.id);
  });
  getStorage(['scheduledTimeOpensRewardTasks']).then(({ scheduledTimeOpensRewardTasks }) => {
    if (!scheduledTimeOpensRewardTasks) return;
    chrome.tabs.create({ url: constants.REWARDS_URL, active: false }, newTab => {
      function listener(updatedTabId, info, updatedTab) {
        if (newTab.id === updatedTabId && info.status === 'complete' && updatedTab.url.includes(constants.REWARDS_URL)) {
          chrome.tabs.executeScript(newTab.id, {
            file: '/content-scripts/open-reward-tasks.js',
          }, () => {
            chrome.tabs.onUpdated.removeListener(listener);
          });
        }
      }
      chrome.tabs.onUpdated.addListener(listener);
    });
  })
}

/**
 * Find the next scheduled search and then from then on, schedule every 24 hours.
 */
async function attemptScheduling() {
  const {
    scheduleSearches,
    scheduledTime,
    lastSearch,
  } = await getStorage(['scheduleSearches', 'scheduledTime', 'lastSearch']);

  if (!scheduleSearches) {
    chrome.alarms.clear(constants.ALARMS.SCHEDULED_SEARCH);
    return;
  }

  const timeUntilTodaysScheduledHour = getDateFromTime(scheduledTime);
  let when = timeUntilTodaysScheduledHour.getTime();
  // there has already been a search completed today, so do the search tomorrow instead
  if (lastSearch > getMidnightDate()) {
    when += constants.ONE_DAY_MILLIS;
  }
  chrome.alarms.create(constants.ALARMS.SCHEDULED_SEARCH, {
    when,
    periodInMinutes: constants.ONE_DAY_MINS,
  });
}

// whenever any of these storage values change, clear the old schedule and attempt to schedule searches in the future
hookStorage(['scheduleSearches', 'scheduledTime'].map(key => ({
  key,
  cb: attemptScheduling,
})));

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === constants.ALARMS.SCHEDULED_SEARCH) {
    startSearchesInNewTab();
  }
});

chrome.runtime.onInstalled.addListener(attemptScheduling);
chrome.runtime.onStartup.addListener(attemptScheduling);
let activePort = null;

chrome.runtime.onConnect.addListener(port => {
  activePort = port;
  port.onMessage.addListener(async msg => {
    switch (msg.type) {
      case constants.MESSAGE_TYPES.START_SEARCH: {
        const tab = await getCurrentTab();
        if (tab) startSearches(tab.id);
        break;
      }
      case constants.MESSAGE_TYPES.STOP_SEARCH: {
        stopSearches();
        break;
      }
      default: {
        break;
      }
    }
  });
  port.onDisconnect.addListener(() => {
    activePort = null;
  });
});

chrome.runtime.onMessage.addListener((msg, sender, cb) => {
  switch(msg.type) {
    case constants.MESSAGE_TYPES.GET_SEARCH_COUNTS: {
      if (setSearchCounts) setSearchCounts();
      break;
    }
    case constants.MESSAGE_TYPES.OPEN_URL_IN_BACKGROUND: {
      chrome.tabs.create({
        url: msg.url,
        active: false,
      });
      break;
    }
    default: break;
  }
});
