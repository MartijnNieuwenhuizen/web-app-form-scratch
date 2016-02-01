# WebAppFromScratch

Opdracht 2
## Voor- en nadelen JavaScript libraries/frameworks onderzoeken 
Het gebruik van een JavaScript librarie/framework hangt helemaal af van de context. Daarom is het ook aan te raden om voorafgaand van elk project jezelf de vraag te stellen, heb ik werkelijk een MVC-controller nodig, of ga ik in dit project de hele jQuery librarie gebruiken of alleen de $(‘’); functie.

### Dus wanneer gebruik je een Javascript library?
Als voorbeeld neem ik de zeer populaire library jQuery. Het is een simpele, efficiënte en snelle manier om je DOM te manipuleren. De syntax is veel gemakkelijker dan VanillaJS en de callbacks zijn erg handig om je animaties compleet te maken. Daarnaast is het selecteren van je elementen een eitje en je bent er zo doorheen gelooped. 
Maar dit is niet het enigste wat je met jQuery kan doen, maar je laad wel de gehele librarie in. Dus een goede eerste vraag is: Wat gebruik in daadwerkelijk uit deze library? Als het antwoord is alleen de $(‘’); selector is het erg overdreven om daar een hele library voor in te laden. Daarnaast betekend het inladen van een library een extra request, dus je pagina duurt iets langer om in te laden. 
Daarom is de vraag die je jezelf moet stellen: wegen de voordelen op tegen de nadelen? Hierin vind ik het erg belangrijk goed na te denken over de performance en niet alleen naar je eigen gemak te kijken. Een handige tip hiervoor is http://youmightnotneedjquery.com/. 

Heel specifiek op jQuery gericht is er nog een goed punt van Lea Verou om in overweging te nemen, de $(‘’); selector. Het element wat deze selector teruggeeft is geen NodeList zoals bij de document.querySelector(‘’); maar een jQuery element. Dit element wordt ‘geextend’ wat problemen kan verzorgen in oudere IE browsers omdat het extra ruimte inneemt, maar het grootste nadeel is dat dit element niet meer goed met VanillaJS is aan te spreken(Verou). Je moet de native jQuery functies gebruiken. Daarom moet je er vooraf voor kiezen om je project in VanillaJS te schrijven of de jQuery library te gebruiken.

Een goed punt ter verdediging van de JS libraries is het punt dat Sasa Sekulic maakt in zijn blog over jQuery(Sekulic) namelijk, libraries zijn vaak onderhouden door 10 to honderden developers en zijn in heel veel projecten geïmplementeerd, dus getest. Dit kan je van je eigen code niet zeggen.

### Dus wanneer gebruik je een Javascript framework?
Gnawme legt in zijn antwoord op de vraag ‘Why should I use an MVC pattern?’ erg goed uit wat het nut is van een MVC framework: “De gedachtegang van elke MVC is om (hoe hij het noemt) Separated Presentation te bieden. Hiermee bedoeld hij dat er een duidelijk beeld wordt geschetst over hoe elke element (Model View Control) eruit moet zien en hoe dit de structuur van de app opbouwt.” Aangezien dit het doel in van een framework is, is vraag één: Is mijn applicatie/site zo complex dat ik een framework nodig heb om deze structuur goed en begrijpelijk te kunnen creëren? Zo ja, gebruik een framework. Hierin is de keuze uiteraard reuze en weet je nooit welk framework je moet kiezen (kan je hier geen rust in vinden? Lees: https://medium.freecodecamp.com/overcoming-javascript-framework-fatigue-741dac9370ee#.260ztuk5q).
Als het antwoord ‘nee’ is, kan je er natuurlijk over discusseren om het alsnog te gebruiken. Misschien ben je dit gewent en is je workflow zo beter. Bedenk dan of het de klant/doelgroep ten goede is dat jij dit framework gebruikt. 
Maar ik deel dezelfde mening als Allenc: gebruik een framework wanneer de complexiteit zo groot is dat dit een meerwaarde bied in het bouwen van deze applicatie/site, **anders niet**.

### Bronvermelding
*Verou, Lea*: http://lea.verou.me/2015/04/jquery-considered-harmful/
*Sekulic, Sasa*: https://medium.com/@sasa_sekulic/programmers-and-libraries-d88e5c32ab21#.wf1gdmwjf 
*Gnawme*: http://programmers.stackexchange.com/questions/105352/why-should-i-use-an-mvc-pattern (antwoord op een vraag)
*Allenc*: http://allenc.com/2015/02/when-to-not-use-a-javascript-framework/ 





Opdracht 3
## Voor- en nadelen single page web app onderzoeken 

Opdracht 4
## Code shown in folder opdracht 4
