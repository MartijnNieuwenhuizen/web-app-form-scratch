# WebAppFromScratch

**Assignment 2**
## Voor- en nadelen JavaScript libraries/frameworks onderzoeken 
Het gebruik van een JavaScript librarie/framework hangt helemaal af van de context. Daarom is het ook aan te raden om voorafgaand van elk project jezelf de vraag te stellen, heb ik werkelijk een MVC-controller nodig, of ga ik in dit project de hele jQuery librarie gebruiken of alleen de $(‘’); functie.

#### Dus wanneer gebruik je een Javascript library?
Als voorbeeld neem ik de zeer populaire library jQuery. Het is een simpele, efficiënte en snelle manier om je DOM te manipuleren. De syntax is veel gemakkelijker dan VanillaJS en de callbacks zijn erg handig om je animaties compleet te maken. Daarnaast is het selecteren van je elementen een eitje en je bent er zo doorheen gelooped. 
Maar dit is niet het enigste wat je met jQuery kan doen, maar je laad wel de gehele librarie in. Dus een goede eerste vraag is: Wat gebruik in daadwerkelijk uit deze library? Als het antwoord is alleen de $(‘’); selector is het erg overdreven om daar een hele library voor in te laden. Daarnaast betekend het inladen van een library een extra request, dus je pagina duurt iets langer om in te laden. 
Daarom is de vraag die je jezelf moet stellen: wegen de voordelen op tegen de nadelen? Hierin vind ik het erg belangrijk goed na te denken over de performance en niet alleen naar je eigen gemak te kijken. Een handige tip hiervoor is http://youmightnotneedjquery.com/. 

Heel specifiek op jQuery gericht is er nog een goed punt van Lea Verou om in overweging te nemen, de $(‘’); selector. Het element wat deze selector teruggeeft is geen NodeList zoals bij de document.querySelector(‘’); maar een jQuery element. Dit element wordt ‘geextend’ wat problemen kan verzorgen in oudere IE browsers omdat het extra ruimte inneemt, maar het grootste nadeel is dat dit element niet meer goed met VanillaJS is aan te spreken(Verou). Je moet de native jQuery functies gebruiken. Daarom moet je er vooraf voor kiezen om je project in VanillaJS te schrijven of de jQuery library te gebruiken.

Een goed punt ter verdediging van de JS libraries is het punt dat Sasa Sekulic maakt in zijn blog over jQuery(Sekulic) namelijk, libraries zijn vaak onderhouden door 10 to honderden developers en zijn in heel veel projecten geïmplementeerd, dus getest. Dit kan je van je eigen code niet zeggen.

#### Dus wanneer gebruik je een Javascript framework?
Gnawme legt in zijn antwoord op de vraag ‘Why should I use an MVC pattern?’ erg goed uit wat het nut is van een MVC framework: “De gedachtegang van elke MVC is om (hoe hij het noemt) Separated Presentation te bieden. Hiermee bedoeld hij dat er een duidelijk beeld wordt geschetst over hoe elke element (Model View Control) eruit moet zien en hoe dit de structuur van de app opbouwt.” Aangezien dit het doel in van een framework is, is vraag één: Is mijn applicatie/site zo complex dat ik een framework nodig heb om deze structuur goed en begrijpelijk te kunnen creëren? Zo ja, gebruik een framework. Hierin is de keuze uiteraard reuze en weet je nooit welk framework je moet kiezen (kan je hier geen rust in vinden? Lees: https://medium.freecodecamp.com/overcoming-javascript-framework-fatigue-741dac9370ee#.260ztuk5q).
Als het antwoord ‘nee’ is, kan je er natuurlijk over discusseren om het alsnog te gebruiken. Misschien ben je dit gewent en is je workflow zo beter. Bedenk dan of het de klant/doelgroep ten goede is dat jij dit framework gebruikt. 
Maar ik deel dezelfde mening als Allenc: gebruik een framework wanneer de complexiteit zo groot is dat dit een meerwaarde bied in het bouwen van deze applicatie/site, **anders niet**.

#### Bronvermelding
*Verou, L.* (2015). jQuery considered harmful. Geraadpleegd op 01-02-2016, van http://lea.verou.me/2015/04/jquery-considered-harmful/
*Sekulic, S.* (2015). Programmers and libraries. Geraadpleegd op 01-02-2016, van https://medium.com/@sasa_sekulic/programmers-and-libraries-d88e5c32ab21#.wf1gdmwjf 
*Gnawme.* (2012). Why should I use an MVC pattern?. Geraadpleegd op 01-02-2016, van http://programmers.stackexchange.com/questions/105352/why-should-i-use-an-mvc-pattern
*Allenc.* (2015). When to Not Use a JavaScript Framework. Geraadpleegd op 01-02-2016, van http://allenc.com/2015/02/when-to-not-use-a-javascript-framework/ 



**Assignment 3**
## Voor- en nadelen single page web app onderzoeken 
#### Single Page Application
Een Single Page Application is een snelle manier om een applicatie te maken die op alle devices werkt. Hieraan zitten wel wat moeilijkheden/nadelen, maar natuurlijk ook voordelen.

#### Nadelen
Omdat je een applicatie maakt die op meerdere devices goed moet werken(iOS) kan het lastig zijn om een goede SEO te behouden, maar hoe doe je dat? Volgens Horwood moet je je content die Google moet indexeren aan de top van je applicatie zetten (je branding content), de content die daar niet staat zou niet relevant moeten zijn voor je vindbaarheid (Horwood). Een iOS app wordt immers niet geindexeerd door Google.

Je moet ook rekening houden dat je met een Single Page Application (SPA) de browser standaarden die je niet wilt overschrijven, overschrijft. Voorbeelden kunnen zijn die back/foreward-button van je browser en je zoekgeschidenis. Omdat de content veranderd en er geen nieuwe pagina wordt geladen werken deze functies niet meer. Hou dit goed in je achterhooft wanneer je een SPA besluit te maken (Tilkov). Dit is alleen wanneer je SPA niet goed is gebouwd!

#### Voordelen
Er zijn natuurlijk ook voor delen aan een SPA. De architectuur is, mits goed gebouwd, erg duidelijk. Hierin kan je het argument opgooien dat je de architectuur van het framework gebruikt i.p.v. de perfecte architectuur, maar wij gebruiken geen framework. Daarnaast is over de structuur van een framework goed nagedacht en wordt dit constant doorontwikkeld. 
Maar terug naar de voordelen, omdat alles modulair gebrouwd wordt is het mogenlijk elk onderdeel van je app appart te cross-browser testen. Dit betekend dat elk onderdeel van je app los werkt en het testen sneller is gebeurd. Ook kan je deze onderdelen makkelijk hergebruiken (Tilkov). 

#### bronvermelding
*Horwood, H.* (2015). Single-Page Applications: Building a Web Stack That Works. Geraadpleegd op 01-02-2016, van https://medium.com/@keithwhor/how-to-build-a-single-page-application-web-stack-that-works-the-baa-architecture-25c1ad941097#.9mh4nrstx

*Tilkov, S.* (2013). Why I hate your Single Page App. Geraadpleegd op 01-02-2016, van https://medium.com/@stilkov/why-i-hate-your-single-page-app-f08bb4ff9134#.ehltv7lsk

**Assignment 4**
## Code shown in folder assignment4
In deze opdracht is de code van justus verbeterd qua structuur. Er zitten twee mappen in deze folder, als eerst 'justus', dit is de originele code en als laatst 'martijn', dit is de code door mij verbeterd. 
Het bestand is opgedeeld in verschillende onderdelen. 
* lib -> hierin zit de library die gebruikt wordt
* module -> hierin zit de debuggin module en een map voor de googlemaps(hierin wil ik later de google maps basis zetten)
Deze onderdelen worden door module.exports & require ingeladen in de main.js

In de main.js is voor de map function de prototype methode gebruikt zodat het mogelijk is om meerdere maps in te laden met dezelfde basis. Daarnaast is het modulairder, dus beter her-te-gebruiken.

**Assignment 5**
## Code shown in folder assignment5
In opdracht 5 wordt de basis van mijn eiegen Single Page Web Application opgezet.
Op JS gebied wordt de app, routes & sections opgezet. Daarnaast worden de secties met 'hashchange' getoggled.
In main-old.js zijn i.p.v. objecten, constructoren gebruikt. Dit is voor deze elementen te overdreven maar bewaard gebleven voor de aankomende opdrachten.

**Werking:**
* Er wordt bij een 'onhashchange' event gekeken naar de huidige hash van de URL
* Deze hash wordt gebruikt om de bijpassende template te vinden in de html
* Als deze template bestaat, wordt hij ingeladen in de HTML van de main. Bestaat hij niet, wordt er een error template ingeladen
* Als je voor de eerste keer op de site komt, dus op de '/', wordt de hash veranderd daar #home (de homepage)

[Link naar de webpagina](http://martijnnieuwenhuizen.github.io/web-app-from-scratch/one/)

**Assignment 6**
Working with an API
Routing
Templating
Underscore
[Link naar de webpagina](http://martijnnieuwenhuizen.github.io/web-app-from-scratch/two/)

**Assignment 7**
User Feedback
Animation
Gesture
Modules
Flow
[Link naar de webpagina](http://martijnnieuwenhuizen.github.io/web-app-from-scratch/three/)

The Flow of the App:
![flow of the app](https://github.com/MartijnNieuwenhuizen/web-app-form-scratch/blob/master/app-route/app-route.png "Flow of the App")

