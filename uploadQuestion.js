
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDrj9GkCqTltKkcMWgNECFcTs0lXNHXNRU",
  authDomain: "prastuti-quiz.firebaseapp.com",
  projectId: "prastuti-quiz",
  storageBucket: "prastuti-quiz.firebasestorage.app",
  messagingSenderId: "214514645163",
  appId: "1:214514645163:web:806b39238086dd8f6d5fee",
  measurementId: "G-VTY262XW6Z"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const questionBank = {
  "class8-science": [
    {
      "question": "Which type of cloth absorbs more water during the activity?",
      "options": [
        "Synthetic fabric",
        "Cotton cloth",
        "Plastic sheet",
        "Nylon cloth"
      ],
      "answer": "Cotton cloth",
      "explanation": "Cotton has natural fibres that absorb water efficiently, making it more absorbent than synthetic fabrics."
    },
    {
      "question": "Why does cotton cloth absorb more water?",
      "options": [
        "It has a smooth surface",
        "It has a natural fibre structure",
        "It is waterproof",
        "It is made of plastic"
      ],
      "answer": "It has a natural fibre structure",
      "explanation": "The natural fibre structure of cotton allows it to soak up and retain more water."
    },
    {
      "question": "Compared to cotton, synthetic fabric absorbs:",
      "options": [
        "More water",
        "The same amount of water",
        "Less water",
        "No water at all"
      ],
      "answer": "Less water",
      "explanation": "Synthetic fabrics are less absorbent, so they take in less water than cotton."
    },
    {
      "question": "Synthetic fabrics dry faster because they:",
      "options": [
        "Absorb more water",
        "Absorb less water",
        "Are heavier than cotton",
        "Have thicker fibres"
      ],
      "answer": "Absorb less water",
      "explanation": "Since synthetic fabrics absorb less water, they dry more quickly than cotton."
    },
    {
      "question": "Which fabric is ideal for making raincoats?",
      "options": [
        "Cotton cloth",
        "Wool",
        "Synthetic fabric",
        "Silk"
      ],
      "answer": "Synthetic fabric",
      "explanation": "Synthetic fabrics repel water and dry quickly, making them suitable for raincoats."
    },
    {
      "question": "Synthetic fabrics are commonly preferred for:",
      "options": [
        "Towels",
        "Sportswear",
        "Handkerchiefs",
        "Cotton bags"
      ],
      "answer": "Sportswear",
      "explanation": "Sportswear is usually made from synthetic fabrics because they dry quickly and do not retain much moisture."
    },
    {
      "question": "Which statement is correct according to the activity?",
      "options": [
        "Cotton absorbs less water than synthetic fabric.",
        "Synthetic fabric absorbs more water than cotton.",
        "Cotton absorbs more water than synthetic fabric.",
        "Both absorb equal amounts of water."
      ],
      "answer": "Cotton absorbs more water than synthetic fabric.",
      "explanation": "The activity demonstrates that cotton is more absorbent than synthetic fabric."
    },
    {
      "question": "Which observation was made during the water absorption experiment?",
      "options": [
        "Both fabrics absorbed equal amounts of water.",
        "Cotton cloth absorbed more water.",
        "Synthetic fabric absorbed more water.",
        "Neither fabric absorbed water."
      ],
      "answer": "Cotton cloth absorbed more water.",
      "explanation": "Cotton retained more water because of its natural fibres."
    },
    {
      "question": "The natural fibre structure of cotton makes it:",
      "options": [
        "Less absorbent",
        "More absorbent",
        "Waterproof",
        "Heat resistant"
      ],
      "answer": "More absorbent",
      "explanation": "Cotton fibres have tiny spaces that help absorb and hold water."
    },
    {
      "question": "According to the lesson, synthetic fabrics are preferred for sportswear because they:",
      "options": [
        "Absorb more water",
        "Dry faster after absorbing less water",
        "Are natural fibres",
        "Become heavier when wet"
      ],
      "answer": "Dry faster after absorbing less water",
      "explanation": "Synthetic fabrics keep the wearer drier because they absorb less moisture and dry quickly."
    },
    {
      "question": "Magnesium burns with a:",
      "options": [
        "Blue flame",
        "Yellow flame",
        "Bright white flame",
        "Red flame"
      ],
      "answer": "Bright white flame",
      "explanation": "Magnesium burns with a dazzling bright white flame during combustion."
    },
    {
      "question": "Burning magnesium forms:",
      "options": [
        "Magnesium sulphate",
        "Magnesium chloride",
        "Magnesium oxide",
        "Magnesium carbonate"
      ],
      "answer": "Magnesium oxide",
      "explanation": "Magnesium reacts with oxygen in the air to form magnesium oxide."
    },
    {
      "question": "Burning magnesium demonstrates:",
      "options": [
        "Evaporation",
        "Combustion",
        "Condensation",
        "Sublimation"
      ],
      "answer": "Combustion",
      "explanation": "Burning is a combustion reaction in which magnesium reacts with oxygen and releases heat and light."
    },
    {
      "question": "During combustion, magnesium reacts with:",
      "options": [
        "Nitrogen",
        "Oxygen",
        "Hydrogen",
        "Carbon dioxide"
      ],
      "answer": "Oxygen",
      "explanation": "Combustion occurs when magnesium combines with oxygen present in the air."
    },
    {
      "question": "Incomplete combustion produces:",
      "options": [
        "Water vapour",
        "Oxygen",
        "Unburnt carbon particles",
        "Nitrogen gas"
      ],
      "answer": "Unburnt carbon particles",
      "explanation": "Incomplete combustion forms soot, which consists of unburnt carbon particles."
    },
    {
      "question": "The luminous zone of a flame contains:",
      "options": [
        "Oxygen",
        "Water vapour",
        "Unburnt carbon particles",
        "Ash"
      ],
      "answer": "Unburnt carbon particles",
      "explanation": "The luminous yellow zone contains glowing carbon particles produced by incomplete combustion."
    },
    {
      "question": "Heating a glass piece in the luminous zone causes:",
      "options": [
        "The glass to melt immediately",
        "Carbon fumes to accumulate on the glass",
        "The glass to become transparent",
        "Water droplets to form"
      ],
      "answer": "Carbon fumes to accumulate on the glass",
      "explanation": "Soot made of carbon particles is deposited on the glass in the luminous zone."
    },
    {
      "question": "The black deposit formed on the glass is:",
      "options": [
        "Iron dust",
        "Carbon",
        "Magnesium oxide",
        "Sand particles"
      ],
      "answer": "Carbon",
      "explanation": "The black coating is soot, which is made of unburnt carbon particles."
    },
    {
      "question": "The deposited carbon on the glass can be:",
      "options": [
        "Dissolved in water",
        "Wiped off",
        "Burned into the glass permanently",
        "Removed only with acid"
      ],
      "answer": "Wiped off",
      "explanation": "The soot deposited on the glass surface is loose and can easily be wiped away."
    },
    {
      "question": "Heat travels through a metal wire by the process of:",
      "options": [
        "Radiation",
        "Reflection",
        "Conduction",
        "Refraction"
      ],
      "answer": "Conduction",
      "explanation": "Conduction is the transfer of heat through direct contact, and metals are good conductors of heat."
    },
    {
      "question": "Metals are good conductors of:",
      "options": [
        "Light",
        "Heat",
        "Sound",
        "Electricity only"
      ],
      "answer": "Heat",
      "explanation": "Metals conduct heat efficiently because their particles transfer thermal energy quickly."
    },
    {
      "question": "Heat moves from the point of contact with the flame to the rest of the metal wire by:",
      "options": [
        "Convection",
        "Radiation",
        "Conduction",
        "Reflection"
      ],
      "answer": "Conduction",
      "explanation": "In solids like metals, heat is transferred through conduction from the hotter region to the cooler region."
    },
    {
      "question": "Which of the following materials is flammable?",
      "options": [
        "Iron",
        "Copper",
        "Paper",
        "Aluminium"
      ],
      "answer": "Paper",
      "explanation": "Paper catches fire easily because it has a relatively low ignition temperature."
    },
    {
      "question": "Which material generally does not burn in a typical flame?",
      "options": [
        "Cloth",
        "Plastic",
        "Wood",
        "Metal"
      ],
      "answer": "Metal",
      "explanation": "Most metals do not burn easily under ordinary conditions because they have very high ignition temperatures."
    },
    {
      "question": "Which of the following affects the ignition temperature of a material?",
      "options": [
        "Air",
        "Water",
        "Dust",
        "Sunlight"
      ],
      "answer": "Water",
      "explanation": "Water raises the effective ignition temperature and cools the material, making it harder to catch fire."
    },
    {
      "question": "Wet filter paper does not catch fire easily because:",
      "options": [
        "It has no oxygen",
        "Water increases its ignition temperature",
        "It becomes lighter",
        "It contains carbon"
      ],
      "answer": "Water increases its ignition temperature",
      "explanation": "Water absorbs heat and prevents the paper from reaching its ignition temperature quickly."
    },
    {
      "question": "Water makes materials more difficult to burn by:",
      "options": [
        "Reducing their weight",
        "Increasing their ignition temperature",
        "Removing oxygen completely",
        "Producing smoke"
      ],
      "answer": "Increasing their ignition temperature",
      "explanation": "Water cools the material and prevents it from reaching the temperature needed for combustion."
    },
    {
      "question": "Carbon deposition on a glass surface demonstrates the presence of:",
      "options": [
        "Water vapour",
        "Oxygen",
        "Unburnt carbon particles",
        "Magnesium oxide"
      ],
      "answer": "Unburnt carbon particles",
      "explanation": "The black soot deposited on the glass is made of unburnt carbon particles produced during incomplete combustion."
    },
    {
      "question": "Which process is demonstrated when magnesium reacts with oxygen to form magnesium oxide?",
      "options": [
        "Condensation",
        "Combustion",
        "Evaporation",
        "Sublimation"
      ],
      "answer": "Combustion",
      "explanation": "Magnesium combines with oxygen and burns, producing magnesium oxide in a combustion reaction."
    },
    {
      "question": "The experiment with wet filter paper mainly demonstrates that:",
      "options": [
        "Water decreases the ignition temperature.",
        "Water increases the ignition temperature of materials.",
        "Wet paper burns faster than dry paper.",
        "Wet paper produces more soot."
      ],
      "answer": "Water increases the ignition temperature of materials.",
      "explanation": "Wet paper requires more heat before it can catch fire because of the cooling effect of water."
    },
    {
      "question": "What happens when like poles of two magnets are brought close together?",
      "options": [
        "They attract each other.",
        "They repel each other.",
        "They lose magnetism.",
        "They stick permanently."
      ],
      "answer": "They repel each other.",
      "explanation": "Like magnetic poles repel each other, while unlike poles attract."
    },
    {
      "question": "Opposite poles of magnets:",
      "options": [
        "Repel each other.",
        "Attract each other.",
        "Do not interact.",
        "Become neutral."
      ],
      "answer": "Attract each other.",
      "explanation": "North and south poles attract due to magnetic force."
    },
    {
      "question": "Magnetic forces can:",
      "options": [
        "Only push objects.",
        "Only pull objects.",
        "Push magnets apart or pull them together.",
        "Only rotate magnets."
      ],
      "answer": "Push magnets apart or pull them together.",
      "explanation": "Magnets can either attract or repel depending on the poles facing each other."
    },
    {
      "question": "Water pressure:",
      "options": [
        "Decreases with depth.",
        "Increases with depth.",
        "Remains the same at all depths.",
        "Depends only on temperature."
      ],
      "answer": "Increases with depth.",
      "explanation": "The deeper you go in a liquid, the greater the pressure due to the weight of the liquid above."
    },
    {
      "question": "Which hole in a water-filled cylinder produces the strongest water flow?",
      "options": [
        "Top hole",
        "Middle hole",
        "Bottom hole",
        "All holes produce equal flow"
      ],
      "answer": "Bottom hole",
      "explanation": "The bottom hole experiences the highest water pressure, producing the strongest water jet."
    },
    {
      "question": "The lower the hole in the container:",
      "options": [
        "The weaker the water flow.",
        "The stronger the water flow.",
        "There is no water flow.",
        "Water pressure decreases."
      ],
      "answer": "The stronger the water flow.",
      "explanation": "Water pressure increases with depth, causing stronger flow from lower holes."
    },
    {
      "question": "Liquid pressure depends on:",
      "options": [
        "The colour of the liquid.",
        "The height of the water column above the point.",
        "The shape of the container only.",
        "The temperature of the water only."
      ],
      "answer": "The height of the water column above the point.",
      "explanation": "The greater the height (depth) of the liquid above a point, the greater the pressure."
    },
    {
      "question": "Why should the cylinder be refilled to the same level during each observation?",
      "options": [
        "To change the water pressure.",
        "To keep the observations fair and accurate.",
        "To reduce the water flow.",
        "To increase the size of the holes."
      ],
      "answer": "To keep the observations fair and accurate.",
      "explanation": "Keeping the water level constant ensures that only the depth of the holes affects the results."
    },
    {
      "question": "Which statement about magnetic force is correct?",
      "options": [
        "Like poles attract each other.",
        "Opposite poles repel each other.",
        "Like poles repel and opposite poles attract.",
        "Magnets do not exert force."
      ],
      "answer": "Like poles repel and opposite poles attract.",
      "explanation": "This is the fundamental rule of magnetism."
    },
    {
      "question": "The experiment with holes at different heights demonstrates:",
      "options": [
        "Air pressure",
        "Magnetic force",
        "Liquid pressure depends on depth",
        "Reflection of light"
      ],
      "answer": "Liquid pressure depends on depth",
      "explanation": "The experiment shows that water pressure increases with depth, causing water to flow farther from lower holes."
    },
    {
      "question": "What happens to friction when the weight of an object increases?",
      "options": [
        "It decreases",
        "It remains the same",
        "It increases",
        "It becomes zero"
      ],
      "answer": "It increases",
      "explanation": "A heavier object presses more strongly against the surface, increasing the normal force. Since friction is proportional to the normal force, the frictional force also increases."
    },
    {
      "question": "Which surface creates more friction?",
      "options": [
        "Plastic",
        "Paper",
        "Sandpaper",
        "Glass"
      ],
      "answer": "Sandpaper",
      "explanation": "Sandpaper has a rough surface with many tiny irregularities that oppose motion, producing greater friction than smooth surfaces."
    },
    {
      "question": "Which surface creates less friction?",
      "options": [
        "Sandpaper",
        "Rough wood",
        "Plastic",
        "Concrete"
      ],
      "answer": "Plastic",
      "explanation": "Plastic is smoother than rough wood, concrete, or sandpaper, so it offers less resistance to motion."
    },
    {
      "question": "On which surface is a heavier object easier to slide?",
      "options": [
        "Sandpaper",
        "Rough surface",
        "Plastic",
        "Stone"
      ],
      "answer": "Plastic",
      "explanation": "A smooth plastic surface produces less friction, making it easier to slide objects compared to rough surfaces."
    },
    {
      "question": "Ball bearings reduce:",
      "options": [
        "Weight",
        "Friction",
        "Pressure",
        "Heat"
      ],
      "answer": "Friction",
      "explanation": "Ball bearings reduce sliding friction by converting it into rolling friction, which requires much less force."
    },
    {
      "question": "Ball bearings contain small:",
      "options": [
        "Rubber balls",
        "Plastic balls",
        "Steel balls",
        "Glass balls"
      ],
      "answer": "Steel balls",
      "explanation": "Steel balls are strong, durable, and can withstand heavy loads while rotating smoothly."
    },
    {
      "question": "Ball bearings help mechanical components to:",
      "options": [
        "Rotate efficiently",
        "Become heavier",
        "Produce more heat",
        "Stop moving"
      ],
      "answer": "Rotate efficiently",
      "explanation": "By reducing friction, ball bearings allow wheels, shafts, and other moving parts to rotate smoothly and efficiently."
    },
    {
      "question": "Ball bearings improve machine performance by:",
      "options": [
        "Increasing resistance",
        "Increasing friction",
        "Reducing wear and tear",
        "Increasing weight"
      ],
      "answer": "Reducing wear and tear",
      "explanation": "Less friction means less heat and damage to machine parts, increasing their lifespan and efficiency."
    },
    {
      "question": "Which surface allows an object to roll down a slope the fastest?",
      "options": [
        "Sandpaper",
        "Rough cardboard",
        "Paper",
        "Gravel"
      ],
      "answer": "Paper",
      "explanation": "Paper provides a smoother surface with less friction, allowing the object to roll more easily."
    },
    {
      "question": "Why do smoother surfaces allow faster movement?",
      "options": [
        "They increase friction.",
        "They reduce friction.",
        "They increase weight.",
        "They increase pressure."
      ],
      "answer": "They reduce friction.",
      "explanation": "Less friction means less resistance to motion, so objects move faster on smooth surfaces."
    },
    {
      "question": "Sound is produced when a tuning fork:",
      "options": [
        "Melts",
        "Vibrates",
        "Breaks",
        "Expands"
      ],
      "answer": "Vibrates",
      "explanation": "The vibrating prongs of the tuning fork create disturbances in the surrounding air, producing sound waves."
    },
    {
      "question": "The vibrations of a tuning fork produce:",
      "options": [
        "Heat",
        "Light",
        "Sound waves",
        "Electricity"
      ],
      "answer": "Sound waves",
      "explanation": "Vibrations travel through the air as sound waves, which can be heard by the human ear."
    },
    {
      "question": "When placed on a solid surface, the tuning fork:",
      "options": [
        "Stops vibrating immediately",
        "Helps the sound be heard",
        "Produces light",
        "Becomes magnetic"
      ],
      "answer": "Helps the sound be heard",
      "explanation": "The solid surface vibrates along with the tuning fork, making the sound louder and easier to hear."
    },
    {
      "question": "The ear helps us:",
      "options": [
        "Taste food",
        "Hear sounds",
        "Smell odours",
        "See objects"
      ],
      "answer": "Hear sounds",
      "explanation": "The ear receives sound waves and converts them into nerve signals that the brain interprets as sound."
    },
    {
      "question": "Different parts of the ear work together to:",
      "options": [
        "Produce sound",
        "Collect, carry and process sound waves",
        "Increase body temperature",
        "Produce electricity"
      ],
      "answer": "Collect, carry and process sound waves",
      "explanation": "The outer, middle, and inner ear each play a role in transmitting and processing sound before it reaches the brain."
    },
    {
      "question": "Sound waves are converted into signals that are understood by the:",
      "options": [
        "Heart",
        "Brain",
        "Lungs",
        "Eyes"
      ],
      "answer": "Brain",
      "explanation": "The inner ear converts vibrations into electrical impulses, which are interpreted by the brain as sound."
    },
    {
      "question": "Longitudinal waves are formed when the slinky is:",
      "options": [
        "Rotated",
        "Pushed and pulled",
        "Hung vertically",
        "Twisted"
      ],
      "answer": "Pushed and pulled",
      "explanation": "Pushing and pulling the slinky creates compressions and rarefactions, demonstrating longitudinal waves."
    },
    {
      "question": "Longitudinal waves consist of:",
      "options": [
        "Crests and troughs",
        "Compressions and rarefactions",
        "Reflections and refractions",
        "Nodes and antinodes"
      ],
      "answer": "Compressions and rarefactions",
      "explanation": "Longitudinal waves have alternating regions where particles are close together (compressions) and far apart (rarefactions)."
    },
    {
      "question": "Transverse waves are formed when the slinky is moved:",
      "options": [
        "Forward only",
        "Side to side",
        "In circles",
        "Upward only"
      ],
      "answer": "Side to side",
      "explanation": "Side-to-side movement causes particles to vibrate perpendicular to the direction of wave travel, producing transverse waves."
    },
    {
      "question": "Transverse waves show:",
      "options": [
        "Compressions only",
        "Rarefactions only",
        "Up-and-down motion",
        "Circular motion"
      ],
      "answer": "Up-and-down motion",
      "explanation": "In transverse waves, particles move up and down while the wave travels horizontally, creating crests and troughs."
    },
    {
      "question": "A kaleidoscope creates symmetrical patterns using:",
      "options": [
        "Refraction of light",
        "Multiple reflections",
        "Dispersion of light",
        "Scattering of light"
      ],
      "answer": "Multiple reflections",
      "explanation": "A kaleidoscope contains mirrors placed at specific angles. Light reflects repeatedly between the mirrors, creating beautiful symmetrical patterns."
    },
    {
      "question": "The colourful designs seen in a kaleidoscope are formed because:",
      "options": [
        "Light passes through water.",
        "Mirrors reflect objects multiple times.",
        "Light is absorbed by mirrors.",
        "The mirrors produce coloured light."
      ],
      "answer": "Mirrors reflect objects multiple times.",
      "explanation": "Small coloured objects inside the kaleidoscope are reflected many times by the mirrors, producing colourful and symmetrical designs."
    },
    {
      "question": "What happens to the patterns when a kaleidoscope is rotated?",
      "options": [
        "The patterns disappear.",
        "The patterns remain the same.",
        "The patterns change as the objects shift position.",
        "The mirrors break."
      ],
      "answer": "The patterns change as the objects shift position.",
      "explanation": "Rotating the kaleidoscope changes the positions of the coloured pieces, resulting in new symmetrical patterns."
    },
    {
      "question": "According to the First Law of Reflection, the incident ray, reflected ray and the normal always lie:",
      "options": [
        "On different planes",
        "In the same plane",
        "Parallel to each other",
        "Perpendicular to each other"
      ],
      "answer": "In the same plane",
      "explanation": "The First Law of Reflection states that the incident ray, reflected ray, and the normal at the point of incidence all lie in the same plane."
    },
    {
      "question": "According to the Second Law of Reflection:",
      "options": [
        "Angle of incidence is greater than the angle of reflection.",
        "Angle of reflection is greater than the angle of incidence.",
        "Angle of incidence is equal to the angle of reflection.",
        "The reflected ray always travels in a straight line."
      ],
      "answer": "Angle of incidence is equal to the angle of reflection.",
      "explanation": "The Second Law of Reflection states that the angle at which light strikes a surface is equal to the angle at which it is reflected."
    },
    {
      "question": "Light follows a predictable path when it reflects from a:",
      "options": [
        "Rough surface",
        "Smooth surface",
        "Wooden surface",
        "Cloth surface"
      ],
      "answer": "Smooth surface",
      "explanation": "Smooth surfaces produce regular reflection, causing light rays to reflect in an orderly and predictable manner."
    },
    {
      "question": "The laws of reflection are useful in understanding the working of:",
      "options": [
        "Mirrors and periscopes",
        "Magnets",
        "Electric circuits",
        "Batteries"
      ],
      "answer": "Mirrors and periscopes",
      "explanation": "Devices such as mirrors and periscopes work based on the laws of reflection, which control the direction of reflected light."
    },
    {
      "question": "When two mirrors are placed at an angle, they produce:",
      "options": [
        "A shadow",
        "Multiple images",
        "A rainbow",
        "Heat"
      ],
      "answer": "Multiple images",
      "explanation": "Light reflects repeatedly between the two mirrors, producing several images of the same object."
    },
    {
      "question": "As the angle between two mirrors decreases, the number of images formed:",
      "options": [
        "Decreases",
        "Remains the same",
        "Increases",
        "Becomes zero"
      ],
      "answer": "Increases",
      "explanation": "Bringing the mirrors closer together (decreasing the angle) causes more reflections, resulting in a greater number of images."
    },
    {
      "question": "The formation of multiple images between two mirrors is based on the principle of:",
      "options": [
        "Refraction",
        "Dispersion",
        "Multiple reflections",
        "Diffusion"
      ],
      "answer": "Multiple reflections",
      "explanation": "Multiple images are formed because light reflects repeatedly between the two mirrors before reaching the observer's eyes."
    }
  ],
  "class8-math": [
    {
      "question": "Algebra tiles are used to:",
      "options": [
        "Draw graphs",
        "Represent and solve equations",
        "Measure angles",
        "Find probability"
      ],
      "answer": "Represent and solve equations",
      "explanation": "Algebra tiles visually represent variables and constants to help solve equations."
    },
    {
      "question": "The process of isolating the variable x is done by:",
      "options": [
        "Multiplying only one side of the equation",
        "Balancing both sides of the equation",
        "Removing the constants first",
        "Changing the variable"
      ],
      "answer": "Balancing both sides of the equation",
      "explanation": "Keeping both sides balanced helps isolate the variable without changing the equation."
    },
    {
      "question": "Why are equal amounts added to both sides of an equation?",
      "options": [
        "To increase the value of x",
        "To cancel terms and simplify the equation",
        "To create a new equation",
        "To reduce the number of variables"
      ],
      "answer": "To cancel terms and simplify the equation",
      "explanation": "Adding the same value to both sides maintains balance and simplifies the equation."
    },
    {
      "question": "Which variable is isolated in the activity described in the lesson?",
      "options": [
        "y",
        "z",
        "x",
        "a"
      ],
      "answer": "x",
      "explanation": "The activity focuses on isolating x to solve the equation."
    },
    {
      "question": "After cancelling the required terms, the remaining tiles help determine:",
      "options": [
        "The area of a figure",
        "The value of x",
        "The perimeter of a shape",
        "The probability of an event"
      ],
      "answer": "The value of x",
      "explanation": "The remaining algebra tiles represent the value of the unknown variable."
    },
    {
      "question": "While solving an equation, every step should:",
      "options": [
        "Change both sides differently",
        "Keep both sides balanced",
        "Remove the variable immediately",
        "Double the constants"
      ],
      "answer": "Keep both sides balanced",
      "explanation": "Each operation must keep both sides equal to preserve the equation."
    },
    {
      "question": "Adding the same number of tiles to both sides helps to:",
      "options": [
        "Draw graphs",
        "Cancel terms and simplify the equation",
        "Increase the number of variables",
        "Change the equation completely"
      ],
      "answer": "Cancel terms and simplify the equation",
      "explanation": "Equal changes on both sides maintain balance and simplify the equation."
    },
    {
      "question": "The method demonstrated in this activity mainly focuses on:",
      "options": [
        "Guessing the value of x",
        "Isolating x by balancing both sides",
        "Drawing coordinate axes",
        "Measuring line segments"
      ],
      "answer": "Isolating x by balancing both sides",
      "explanation": "The balancing method is used to isolate the variable and solve the equation."
    },
    {
      "question": "Keeping both sides of an equation balanced is essential to:",
      "options": [
        "Solve the equation accurately",
        "Increase the value of x",
        "Draw algebra tiles correctly",
        "Reduce the constants"
      ],
      "answer": "Solve the equation accurately",
      "explanation": "A balanced equation ensures the correct value of the variable is obtained."
    },
    {
      "question": "Which learning material is specifically used in this activity?",
      "options": [
        "Compass",
        "Algebra tiles",
        "Protractor",
        "Graph paper"
      ],
      "answer": "Algebra tiles",
      "explanation": "Algebra tiles are used to visually model and solve linear equations."
    },
    {
      "question": "The sum of the interior angles of any triangle is:",
      "options": [
        "90°",
        "180°",
        "270°",
        "360°"
      ],
      "answer": "180°",
      "explanation": "The three interior angles of every triangle always add up to 180°."
    },
    {
      "question": "The sum of the interior angles of any quadrilateral is:",
      "options": [
        "180°",
        "270°",
        "360°",
        "540°"
      ],
      "answer": "360°",
      "explanation": "The four interior angles of any quadrilateral always total 360°."
    },
    {
      "question": "According to the lesson, the interior angle sum of every triangle is:",
      "options": [
        "90°",
        "120°",
        "180°",
        "360°"
      ],
      "answer": "180°",
      "explanation": "Every triangle has an interior angle sum of 180°."
    },
    {
      "question": "Which statement is correct?",
      "options": [
        "Every triangle has an interior angle sum of 360°.",
        "Every quadrilateral has an interior angle sum of 180°.",
        "Every quadrilateral has an interior angle sum of 360°.",
        "Every triangle has an interior angle sum of 270°."
      ],
      "answer": "Every quadrilateral has an interior angle sum of 360°.",
      "explanation": "The sum of the interior angles of any quadrilateral is always 360°."
    },
    {
      "question": "Which figure always has an interior angle sum of 180°?",
      "options": [
        "Quadrilateral",
        "Triangle",
        "Pentagon",
        "Hexagon"
      ],
      "answer": "Triangle",
      "explanation": "Every triangle has an interior angle sum of 180°."
    },
    {
      "question": "Which figure always has an interior angle sum of 360°?",
      "options": [
        "Triangle",
        "Circle",
        "Quadrilateral",
        "Line"
      ],
      "answer": "Quadrilateral",
      "explanation": "Every quadrilateral has four interior angles that add up to 360°."
    },
    {
      "question": "Experimental probability is based on:",
      "options": [
        "Actual observations or experiments",
        "Guesswork only",
        "Interior angles",
        "Algebra tiles"
      ],
      "answer": "Actual observations or experiments",
      "explanation": "Experimental probability is calculated from the outcomes of actual experiments."
    },
    {
      "question": "Theoretical probability is based on:",
      "options": [
        "Actual experiment only",
        "Mathematical reasoning of possible outcomes",
        "Measuring angles",
        "Drawing graphs"
      ],
      "answer": "Mathematical reasoning of possible outcomes",
      "explanation": "Theoretical probability is determined using mathematical analysis of all possible outcomes."
    },
    {
      "question": "The lesson compares:",
      "options": [
        "Area and perimeter",
        "Experimental and theoretical probability",
        "Fractions and decimals",
        "Triangles and quadrilaterals"
      ],
      "answer": "Experimental and theoretical probability",
      "explanation": "The lesson compares actual results with expected mathematical probabilities."
    },
    {
      "question": "Probability helps us determine the:",
      "options": [
        "Colour of an object",
        "Likelihood of an outcome",
        "Length of a line",
        "Weight of a solid"
      ],
      "answer": "Likelihood of an outcome",
      "explanation": "Probability measures how likely an event is to occur."
    },
    {
      "question": "Independent events are introduced in which chapter?",
      "options": [
        "Linear Equations in One Variable",
        "Data Handling",
        "Mensuration",
        "Factorization"
      ],
      "answer": "Data Handling",
      "explanation": "The Data Handling chapter introduces the concept of independent events in probability."
    },
    {
      "question": "Probability distribution helps us understand:",
      "options": [
        "The arrangement of shapes",
        "The distribution of outcomes",
        "The area of figures",
        "The value of x"
      ],
      "answer": "The distribution of outcomes",
      "explanation": "A probability distribution shows how likely different outcomes are."
    },
    {
      "question": "The likelihood of different outcomes depends on:",
      "options": [
        "Combinations of outcomes",
        "The number of angles",
        "The number of equations",
        "The number of graphs"
      ],
      "answer": "Combinations of outcomes",
      "explanation": "Probability is determined by the possible combinations of outcomes."
    },
    {
      "question": "Which topic is included in the Data Handling chapter?",
      "options": [
        "Algebra tiles",
        "Probability of independent events",
        "Nets of solids",
        "Coordinate geometry"
      ],
      "answer": "Probability of independent events",
      "explanation": "The Data Handling chapter covers probability and independent events."
    },
    {
      "question": "Algebra tiles are used to add two polynomials by:",
      "options": [
        "Dividing like terms",
        "Combining like terms",
        "Multiplying constants only",
        "Drawing graphs"
      ],
      "answer": "Combining like terms",
      "explanation": "Like algebra tiles are combined to simplify the sum of polynomials."
    },
    {
      "question": "While adding polynomials using algebra tiles, similar tiles represent:",
      "options": [
        "Unlike terms",
        "Like terms",
        "Fractions",
        "Angles"
      ],
      "answer": "Like terms",
      "explanation": "Similar algebra tiles represent like terms that can be combined."
    },
    {
      "question": "In algebra tiles, squares represent:",
      "options": [
        "Constants",
        "x",
        "x²",
        "y²"
      ],
      "answer": "x²",
      "explanation": "Large square tiles represent the term x²."
    },
    {
      "question": "In algebra tiles, rectangles represent:",
      "options": [
        "x",
        "x²",
        "Constants",
        "Cubes"
      ],
      "answer": "x",
      "explanation": "Rectangular tiles are used to represent the variable x."
    },
    {
      "question": "Unit tiles represent:",
      "options": [
        "x²",
        "x",
        "Constants",
        "Variables only"
      ],
      "answer": "Constants",
      "explanation": "Small square unit tiles represent constant values such as 1."
    },
    {
      "question": "The sum of the algebra tiles gives the:",
      "options": [
        "Area of a square",
        "Simplified polynomial",
        "Perimeter of a rectangle",
        "Value of x only"
      ],
      "answer": "Simplified polynomial",
      "explanation": "Combining all like tiles gives the simplified polynomial expression."
    },
    {
      "question": "While subtracting two polynomials using algebra tiles, the tiles are changed to:",
      "options": [
        "Increase their size",
        "Change their signs",
        "Represent angles",
        "Represent fractions"
      ],
      "answer": "Change their signs",
      "explanation": "The signs of the tiles are changed to represent subtraction correctly."
    },
    {
      "question": "Multiplying binomials using algebra tiles helps to:",
      "options": [
        "Divide expressions",
        "Visually represent each term's multiplication",
        "Draw coordinate axes",
        "Find probability"
      ],
      "answer": "Visually represent each term's multiplication",
      "explanation": "Algebra tiles show how each term in one binomial multiplies each term in the other."
    },
    {
      "question": "The resulting tiles after multiplying binomials show the:",
      "options": [
        "Expanded form of the product",
        "Difference of two numbers",
        "Probability distribution",
        "Graph of the equation"
      ],
      "answer": "Expanded form of the product",
      "explanation": "The arranged tiles represent the expanded polynomial after multiplication."
    },
    {
      "question": "Magnetic tiles are used to visually demonstrate the identity:",
      "options": [
        "a² + b² = c²",
        "(a + b)² = a² + b² + 2ab",
        "a + b = b + a",
        "x + y = xy"
      ],
      "answer": "(a + b)² = a² + b² + 2ab",
      "explanation": "Magnetic tiles provide a geometric proof of the identity (a + b)² = a² + 2ab + b²."
    },
    {
      "question": "In the identity (a + b)², each tile contributes to the:",
      "options": [
        "Volume only",
        "Total area",
        "Perimeter only",
        "Height only"
      ],
      "answer": "Total area",
      "explanation": "Each tile represents part of the total area of the square."
    },
    {
      "question": "Magnetic tiles are also used to demonstrate which identity?",
      "options": [
        "a² − b² = (a + b)(a − b)",
        "a² + b² = c²",
        "a + b = ab",
        "x² + y² = xy"
      ],
      "answer": "a² − b² = (a + b)(a − b)",
      "explanation": "Magnetic tiles visually demonstrate the difference of squares identity."
    },
    {
      "question": "The identity a² − b² = (a + b)(a − b) helps students understand the:",
      "options": [
        "Geometric basis of the difference of squares",
        "Properties of triangles",
        "Coordinate geometry",
        "Experimental probability"
      ],
      "answer": "Geometric basis of the difference of squares",
      "explanation": "The identity is explained using geometric arrangements of areas."
    },
    {
      "question": "By arranging magnetic tiles on a board, students can demonstrate:",
      "options": [
        "(x + a)(x + b) = x² + ax + bx + ab",
        "x + y = xy",
        "a² + b² = c²",
        "x² = y²"
      ],
      "answer": "(x + a)(x + b) = x² + ax + bx + ab",
      "explanation": "Magnetic tiles visually show the expansion of two binomials."
    },
    {
      "question": "The activity with magnetic tiles provides a geometric proof of:",
      "options": [
        "Polynomial expansion",
        "Coordinate geometry",
        "Probability",
        "Mensuration"
      ],
      "answer": "Polynomial expansion",
      "explanation": "The arrangement of tiles demonstrates how polynomial expansion works geometrically."
    },
    {
      "question": "Cubes and cuboids are used to visualize the identity:",
      "options": [
        "(x + y)³ = x³ + 3x²y + 3xy² + y³",
        "(a + b)² = a² + 2ab + b²",
        "a² − b² = (a + b)(a − b)",
        "x + y = xy"
      ],
      "answer": "(x + y)³ = x³ + 3x²y + 3xy² + y³",
      "explanation": "Cubes and cuboids help visualize the expansion of (x + y)³ geometrically."
    },
    {
      "question": "Nets are:",
      "options": [
        "Three-dimensional shapes",
        "Two-dimensional layouts of three-dimensional shapes",
        "Curved surfaces only",
        "Graphs of solids"
      ],
      "answer": "Two-dimensional layouts of three-dimensional shapes",
      "explanation": "A net is a flat pattern that can be folded to form a three-dimensional solid."
    },
    {
      "question": "Nets help us understand:",
      "options": [
        "Probability",
        "The structure of three-dimensional solids",
        "Coordinate geometry",
        "Linear equations"
      ],
      "answer": "The structure of three-dimensional solids",
      "explanation": "Nets show how the faces of a solid fit together to form a 3D shape."
    },
    {
      "question": "Understanding nets helps us visualize how:",
      "options": [
        "Graphs are plotted",
        "Flat shapes form three-dimensional figures",
        "Angles are measured",
        "Equations are solved"
      ],
      "answer": "Flat shapes form three-dimensional figures",
      "explanation": "Folding a net demonstrates how a flat shape becomes a three-dimensional object."
    },
    {
      "question": "Which of the following solids is mentioned in the lesson on nets?",
      "options": [
        "Sphere",
        "Cube",
        "Cone",
        "Hemisphere"
      ],
      "answer": "Cube",
      "explanation": "A cube is one of the common solids represented using nets."
    },
    {
      "question": "Which of the following is also mentioned as a solid that can be represented using nets?",
      "options": [
        "Prism",
        "Cylinder",
        "Pyramid",
        "Sphere"
      ],
      "answer": "Cylinder",
      "explanation": "A cylinder can also be represented using a net consisting of rectangles and circles."
    },
    {
      "question": "According to the lesson, nets can be used to represent:",
      "options": [
        "Cubes, cuboids, cylinders and tetrahedrons",
        "Circles, triangles and rectangles only",
        "Graphs and charts",
        "Angles and equations"
      ],
      "answer": "Cubes, cuboids, cylinders and tetrahedrons",
      "explanation": "Nets can be drawn for many three-dimensional solids like cubes, cuboids, cylinders and tetrahedrons."
    },
    {
      "question": "The activity demonstrates how to divide:",
      "options": [
        "A polynomial of degree 1 by a polynomial of degree 2",
        "A polynomial of degree 2 by a polynomial of degree 1",
        "A number by a fraction",
        "Two constants"
      ],
      "answer": "A polynomial of degree 2 by a polynomial of degree 1",
      "explanation": "The activity explains polynomial division using a quadratic dividend and a linear divisor."
    },
    {
      "question": "Which learning material is used along with the area model to divide polynomials?",
      "options": [
        "Compass",
        "Algebra tiles",
        "Protractor",
        "Graph paper"
      ],
      "answer": "Algebra tiles",
      "explanation": "Algebra tiles help visualize polynomial division using the area model."
    },
    {
      "question": "In the activity, the dividend is arranged into a:",
      "options": [
        "Circle",
        "Rectangle",
        "Triangle",
        "Square pyramid"
      ],
      "answer": "Rectangle",
      "explanation": "The dividend is arranged as the area of a rectangle in the area model."
    },
    {
      "question": "In the area model, the divisor is used as:",
      "options": [
        "The diagonal of the rectangle",
        "One side of the rectangle",
        "The area of the rectangle",
        "The perimeter of the rectangle"
      ],
      "answer": "One side of the rectangle",
      "explanation": "The divisor represents one side of the rectangle in the area model."
    },
    {
      "question": "The other side of the rectangle represents the:",
      "options": [
        "Dividend",
        "Quotient",
        "Remainder",
        "Divisor"
      ],
      "answer": "Quotient",
      "explanation": "The unknown side of the rectangle represents the quotient of the division."
    },
    {
      "question": "Which method is also used to divide a polynomial of degree 2 by a polynomial of degree 1?",
      "options": [
        "Coordinate geometry",
        "Exploding dots",
        "Bar graph",
        "Probability distribution"
      ],
      "answer": "Exploding dots",
      "explanation": "The exploding dots method provides another visual approach to polynomial division."
    },
    {
      "question": "The area model helps students determine the:",
      "options": [
        "Quotient of the polynomial division",
        "Perimeter of the rectangle",
        "Number of variables",
        "Probability of an event"
      ],
      "answer": "Quotient of the polynomial division",
      "explanation": "The area model helps find the quotient by arranging algebra tiles correctly."
    },
    {
      "question": "According to the lesson, exploding dots are used to learn:",
      "options": [
        "Addition of polynomials",
        "Division of a polynomial of degree 2 by a polynomial of degree 1",
        "Coordinate geometry",
        "Angle sums of quadrilaterals"
      ],
      "answer": "Division of a polynomial of degree 2 by a polynomial of degree 1",
      "explanation": "Exploding dots simplify the process of dividing polynomials visually."
    },
    {
      "question": "Coordinate geometry is used to:",
      "options": [
        "Solve equations using algebra tiles",
        "Plot points on a coordinate grid",
        "Find the angle sum of a triangle",
        "Divide polynomials"
      ],
      "answer": "Plot points on a coordinate grid",
      "explanation": "Coordinate geometry locates points using ordered pairs on a graph."
    },
    {
      "question": "In coordinate geometry, each point represents:",
      "options": [
        "A specific value",
        "A line only",
        "A circle",
        "A probability"
      ],
      "answer": "A specific value",
      "explanation": "Each point corresponds to a unique pair of coordinates."
    },
    {
      "question": "The lesson helps students understand:",
      "options": [
        "Linear relationships",
        "Difference of squares",
        "Nets of solids",
        "Polynomial division"
      ],
      "answer": "Linear relationships",
      "explanation": "Coordinate geometry helps students understand relationships between variables."
    },
    {
      "question": "Graphs help students in:",
      "options": [
        "Reading and interpreting data",
        "Solving quadratic equations",
        "Measuring angles",
        "Drawing nets"
      ],
      "answer": "Reading and interpreting data",
      "explanation": "Graphs make it easier to analyze and interpret information visually."
    },
    {
      "question": "While creating a bar graph, students should first:",
      "options": [
        "Draw random bars",
        "Set up and label the axes",
        "Colour the graph",
        "Draw a circle"
      ],
      "answer": "Set up and label the axes",
      "explanation": "Properly labeled axes are essential before plotting data on a graph."
    },
    {
      "question": "While drawing a graph, a consistent ______ should be used.",
      "options": [
        "Colour",
        "Scale",
        "Shape",
        "Size of bars only"
      ],
      "answer": "Scale",
      "explanation": "A consistent scale ensures the graph represents data accurately."
    },
    {
      "question": "In a bar graph, the bars should have:",
      "options": [
        "Different widths",
        "Equal widths with appropriate gaps",
        "No gaps between them",
        "Unequal heights only"
      ],
      "answer": "Equal widths with appropriate gaps",
      "explanation": "Equal-width bars with uniform gaps make the graph easy to read and compare."
    },
    {
      "question": "A line graph is used to show:",
      "options": [
        "The colour of objects",
        "How a variable changes over time",
        "The angle sum of polygons",
        "Polynomial identities"
      ],
      "answer": "How a variable changes over time",
      "explanation": "A line graph displays trends or changes in data over a period of time."
    },
    {
      "question": "Which variable is used in the lesson while creating a line graph?",
      "options": [
        "Distance",
        "Speed",
        "Temperature",
        "Height"
      ],
      "answer": "Temperature",
      "explanation": "The lesson uses temperature data to demonstrate how to draw a line graph."
    },
    {
      "question": "Creating graphs helps students understand:",
      "options": [
        "Data representation",
        "Factorization only",
        "Angle measurement",
        "Mensuration only"
      ],
      "answer": "Data representation",
      "explanation": "Graphs present data visually, making it easier to understand and analyze."
    },
    {
      "question": "One of the skills developed through this chapter is:",
      "options": [
        "Reading and interpreting line graphs",
        "Multiplying matrices",
        "Solving simultaneous equations",
        "Constructing triangles"
      ],
      "answer": "Reading and interpreting line graphs",
      "explanation": "The chapter develops the ability to read, interpret, and analyze graphs."
    },
    {
      "question": "The main purpose of plotting points on a coordinate grid is to:",
      "options": [
        "Represent specific values accurately",
        "Measure angles",
        "Find the area of figures",
        "Divide polynomials"
      ],
      "answer": "Represent specific values accurately",
      "explanation": "Plotting points shows the exact position of values on the coordinate plane."
    },
    {
      "question": "A bar graph should represent data using:",
      "options": [
        "Bars of equal width",
        "Bars of different widths",
        "Circles",
        "Triangles"
      ],
      "answer": "Bars of equal width",
      "explanation": "Equal-width bars ensure fair comparison between different categories."
    },
    {
      "question": "Appropriate gaps between bars make a bar graph:",
      "options": [
        "Easier to read accurately",
        "Smaller in size",
        "More colourful",
        "Harder to understand"
      ],
      "answer": "Easier to read accurately",
      "explanation": "Uniform gaps improve the clarity and readability of a bar graph."
    },
    {
      "question": "The chapter teaches students to understand:",
      "options": [
        "Coordinate geometry and graph interpretation",
        "Reflection of light",
        "Magnetic forces",
        "Combustion reactions"
      ],
      "answer": "Coordinate geometry and graph interpretation",
      "explanation": "The chapter focuses on plotting points and interpreting different types of graphs."
    },
    {
      "question": "Which of the following is included in the Introduction to Graphs chapter?",
      "options": [
        "Plotting points, bar graphs and line graphs",
        "Nets of solids and factorization",
        "Algebra tiles and probability only",
        "Interior angles of quadrilaterals"
      ],
      "answer": "Plotting points, bar graphs and line graphs",
      "explanation": "The chapter introduces plotting points and creating both bar graphs and line graphs."
    }
  ],
  "class9-science": [
    {
      "question": "Which state of matter is highly compressible?",
      "options": [
        "Solid",
        "Liquid",
        "Gas",
        "Plasma"
      ],
      "answer": "Gas",
      "explanation": "Gases are highly compressible because their particles are far apart."
    },
    {
      "question": "Gases are highly compressible because they have:",
      "options": [
        "Closely packed particles",
        "Large spaces between their particles",
        "Heavy particles",
        "Fixed particle arrangement"
      ],
      "answer": "Large spaces between their particles",
      "explanation": "The large spaces between gas particles allow them to be compressed easily."
    },
    {
      "question": "Liquids are less compressible because their particles are:",
      "options": [
        "Very far apart",
        "Closely packed",
        "Fixed permanently",
        "Continuously disappearing"
      ],
      "answer": "Closely packed",
      "explanation": "Liquid particles are close together, leaving very little space for compression."
    },
    {
      "question": "The compressibility activity demonstrates that the properties of matter depend on:",
      "options": [
        "Colour of the substance",
        "Particle arrangement",
        "Size of the container",
        "Mass of the substance"
      ],
      "answer": "Particle arrangement",
      "explanation": "The arrangement of particles determines the physical properties of matter."
    },
    {
      "question": "Camphor changes directly from a solid to a gas. This process is called:",
      "options": [
        "Evaporation",
        "Condensation",
        "Sublimation",
        "Melting"
      ],
      "answer": "Sublimation",
      "explanation": "Sublimation is the direct change of a solid into a gas without becoming a liquid."
    },
    {
      "question": "Which factor increases the rate of sublimation of camphor?",
      "options": [
        "Lower airflow",
        "Increased airflow or surface area",
        "Lower temperature",
        "Covering the camphor completely"
      ],
      "answer": "Increased airflow or surface area",
      "explanation": "Greater airflow or surface area speeds up the sublimation process."
    },
    {
      "question": "Heating increases the ________ of particles.",
      "options": [
        "Density",
        "Kinetic energy",
        "Volume only",
        "Mass"
      ],
      "answer": "Kinetic energy",
      "explanation": "Heating gives particles more kinetic energy, causing them to move faster."
    },
    {
      "question": "A saturated sodium chloride solution has a higher boiling point because of:",
      "options": [
        "Dissolved salts",
        "Less water",
        "Air bubbles",
        "Larger particles"
      ],
      "answer": "Dissolved salts",
      "explanation": "Dissolved salt raises the boiling point of water."
    },
    {
      "question": "A sugar solution forms a:",
      "options": [
        "Heterogeneous mixture",
        "Clear solution",
        "Suspension",
        "Residue"
      ],
      "answer": "Clear solution",
      "explanation": "Sugar dissolves completely in water to form a clear, homogeneous solution."
    },
    {
      "question": "Which of the following is a heterogeneous mixture?",
      "options": [
        "Sugar solution",
        "Alum solution",
        "Soil",
        "Salt solution"
      ],
      "answer": "Soil",
      "explanation": "Soil contains different components that are not uniformly mixed."
    },
    {
      "question": "During filtration, which mixture leaves a residue?",
      "options": [
        "Sugar solution",
        "Alum solution",
        "Soil and sand mixture",
        "Salt solution"
      ],
      "answer": "Soil and sand mixture",
      "explanation": "Insoluble particles remain as residue on the filter paper after filtration."
    },
    {
      "question": "Colloidal solutions exhibit the:",
      "options": [
        "Reflection effect",
        "Refraction effect",
        "Tyndall effect",
        "Doppler effect"
      ],
      "answer": "Tyndall effect",
      "explanation": "Colloidal particles scatter light, producing the Tyndall effect."
    },
    {
      "question": "The Tyndall effect occurs because colloidal solutions:",
      "options": [
        "Scatter light",
        "Absorb all light",
        "Reflect only red light",
        "Produce heat"
      ],
      "answer": "Scatter light",
      "explanation": "The suspended particles in a colloid scatter light passing through them."
    },
    {
      "question": "Atoms combine to form:",
      "options": [
        "Elements",
        "Molecules",
        "Mixtures",
        "Solutions"
      ],
      "answer": "Molecules",
      "explanation": "Two or more atoms chemically combine to form molecules."
    },
    {
      "question": "Atoms combine to form molecules in order to create:",
      "options": [
        "Larger atoms",
        "Stable structures",
        "Electric current",
        "Heat energy"
      ],
      "answer": "Stable structures",
      "explanation": "Atoms bond together to achieve greater stability."
    },
    {
      "question": "The shape of a molecule depends on:",
      "options": [
        "Its colour",
        "The number and type of atoms",
        "Its temperature only",
        "Its mass only"
      ],
      "answer": "The number and type of atoms",
      "explanation": "Molecular shape is determined by the arrangement and types of atoms present."
    },
    {
      "question": "Understanding chemical bonding becomes easier by using:",
      "options": [
        "Graph paper",
        "Model kits",
        "Measuring cylinders",
        "Thermometers"
      ],
      "answer": "Model kits",
      "explanation": "Model kits help visualize atoms, bonds, and molecular structures."
    },
    {
      "question": "Which molecular formula is specifically mentioned in the lesson for model construction?",
      "options": [
        "CO₂",
        "NH₃",
        "H₂O",
        "O₂"
      ],
      "answer": "H₂O",
      "explanation": "Water (H₂O) is commonly used as a model to demonstrate molecular structure."
    },
    {
      "question": "Atoms have specific electron arrangements in:",
      "options": [
        "Nuclei only",
        "Energy levels",
        "Molecules",
        "Chemical bonds"
      ],
      "answer": "Energy levels",
      "explanation": "Electrons are arranged in distinct energy levels around the nucleus."
    },
    {
      "question": "Which electrons determine the chemical properties of an atom?",
      "options": [
        "Core electrons",
        "Valence electrons",
        "Inner electrons",
        "Neutrons"
      ],
      "answer": "Valence electrons",
      "explanation": "Valence electrons participate in bonding and determine an atom's chemical behavior."
    },
    {
      "question": "Constructing atomic models helps students understand:",
      "options": [
        "Friction and motion",
        "Bonding and chemical reactions",
        "Light reflection",
        "Sound propagation"
      ],
      "answer": "Bonding and chemical reactions",
      "explanation": "Atomic models help visualize how atoms bond and participate in chemical reactions."
    },
    {
      "question": "Which instrument is used to detect electric charges?",
      "options": [
        "Microscope",
        "Electroscope",
        "Thermometer",
        "Barometer"
      ],
      "answer": "Electroscope",
      "explanation": "An electroscope is used to detect the presence of electric charges."
    },
    {
      "question": "Rubbing a comb with a cloth generates:",
      "options": [
        "Heat energy",
        "Static electricity by electron transfer",
        "Sound energy",
        "Magnetic force"
      ],
      "answer": "Static electricity by electron transfer",
      "explanation": "Rubbing transfers electrons, creating static electricity on the comb."
    },
    {
      "question": "When a rubbed comb touches the copper wire of an electroscope, the aluminium foils move apart because:",
      "options": [
        "Unlike charges attract",
        "Like charges repel",
        "Gravity increases",
        "The foils become heavier"
      ],
      "answer": "Like charges repel",
      "explanation": "Both aluminium foils acquire the same charge and repel each other."
    },
    {
      "question": "Which instrument enables the observation of microscopic structures?",
      "options": [
        "Telescope",
        "Microscope",
        "Electroscope",
        "Periscope"
      ],
      "answer": "Microscope",
      "explanation": "A microscope magnifies tiny objects that cannot be seen with the naked eye."
    },
    {
      "question": "Changing the magnification level helps to:",
      "options": [
        "Increase the size of the slide",
        "Enhance observations of microscopic structures",
        "Change the colour of cells",
        "Measure cell mass"
      ],
      "answer": "Enhance observations of microscopic structures",
      "explanation": "Higher magnification provides a clearer and more detailed view of microscopic structures."
    },
    {
      "question": "Plant cells are generally:",
      "options": [
        "Circular with no cell wall",
        "Rectangular with rigid cell walls",
        "Irregular without a cell wall",
        "Oval with no nucleus"
      ],
      "answer": "Rectangular with rigid cell walls",
      "explanation": "Plant cells have a rigid cell wall that gives them a regular rectangular shape."
    },
    {
      "question": "Animal cells are generally:",
      "options": [
        "Rectangular",
        "Irregular in shape",
        "Square-shaped",
        "Cylindrical"
      ],
      "answer": "Irregular in shape",
      "explanation": "Animal cells lack a rigid cell wall, giving them an irregular shape."
    },
    {
      "question": "Staining helps in observing structures such as the:",
      "options": [
        "Cell membrane only",
        "Nucleus and vacuoles",
        "Chlorophyll only",
        "Cytoplasm only"
      ],
      "answer": "Nucleus and vacuoles",
      "explanation": "Stains improve the visibility of cell structures like the nucleus and vacuoles."
    },
    {
      "question": "Diffusion is the movement of particles from:",
      "options": [
        "Low concentration to high concentration",
        "High concentration to low concentration",
        "One solid to another",
        "Gas to solid only"
      ],
      "answer": "High concentration to low concentration",
      "explanation": "Diffusion occurs as particles move from a region of higher concentration to lower concentration."
    },
    {
      "question": "Osmosis is the movement of:",
      "options": [
        "Salt through a membrane",
        "Water through a membrane due to a concentration gradient",
        "Air through a membrane",
        "Heat through a membrane"
      ],
      "answer": "Water through a membrane due to a concentration gradient",
      "explanation": "Osmosis is the movement of water across a selectively permeable membrane."
    },
    {
      "question": "Saltwater causes potato cells to:",
      "options": [
        "Gain water rapidly",
        "Lose water, demonstrating osmosis",
        "Divide continuously",
        "Produce starch"
      ],
      "answer": "Lose water, demonstrating osmosis",
      "explanation": "Water moves out of the potato cells into the salt solution by osmosis."
    },
    {
      "question": "Parenchyma cells have:",
      "options": [
        "Thick walls and no vacuoles",
        "Thin walls and large vacuoles",
        "Thick walls and small vacuoles",
        "No cell walls"
      ],
      "answer": "Thin walls and large vacuoles",
      "explanation": "Parenchyma cells have thin cell walls and large vacuoles for storage."
    },
    {
      "question": "Sclerenchyma cells provide:",
      "options": [
        "Storage only",
        "Structural support",
        "Photosynthesis",
        "Reproduction"
      ],
      "answer": "Structural support",
      "explanation": "Thick-walled sclerenchyma cells provide strength and support to plants."
    },
    {
      "question": "Observing plant tissues under a microscope helps students understand their:",
      "options": [
        "Colour only",
        "Functions and differences",
        "Weight only",
        "Chemical formulae"
      ],
      "answer": "Functions and differences",
      "explanation": "Microscopic observation reveals the structure and functions of different plant tissues."
    },
    {
      "question": "Striated muscle fibres are responsible for:",
      "options": [
        "Involuntary movements only",
        "Voluntary movements",
        "Water transport",
        "Photosynthesis"
      ],
      "answer": "Voluntary movements",
      "explanation": "Striated muscles control voluntary movements of the body."
    },
    {
      "question": "Nerve cells are responsible for:",
      "options": [
        "Storing food",
        "Transmitting signals and coordinating body functions",
        "Producing chlorophyll",
        "Carrying oxygen"
      ],
      "answer": "Transmitting signals and coordinating body functions",
      "explanation": "Nerve cells carry electrical impulses throughout the body."
    },
    {
      "question": "Charts are useful for visualizing structures such as:",
      "options": [
        "Atoms only",
        "Muscle fibres and neurons",
        "Molecules only",
        "Sound waves only"
      ],
      "answer": "Muscle fibres and neurons",
      "explanation": "Charts help students understand the structure of muscles and nerve cells."
    },
    {
      "question": "Which force keeps the ball moving in a circular path?",
      "options": [
        "Gravitational force",
        "Frictional force",
        "Centripetal force",
        "Magnetic force"
      ],
      "answer": "Centripetal force",
      "explanation": "Centripetal force continuously pulls the ball toward the centre of the circular path."
    },
    {
      "question": "What happens to the ball when the thread is released?",
      "options": [
        "It continues in a circular path.",
        "It stops immediately.",
        "It moves in a straight line.",
        "It moves toward the centre."
      ],
      "answer": "It moves in a straight line.",
      "explanation": "Once the centripetal force is removed, the ball moves in a straight line due to inertia."
    },
    {
      "question": "The tendency of an object to move outward during circular motion is called the:",
      "options": [
        "Centripetal effect",
        "Centrifugal effect",
        "Magnetic effect",
        "Frictional effect"
      ],
      "answer": "Centrifugal effect",
      "explanation": "The centrifugal effect is the apparent outward tendency of an object moving in a circular path."
    },
    {
      "question": "What causes the ball to accelerate down the ramp?",
      "options": [
        "Friction",
        "Gravity",
        "Magnetism",
        "Air resistance"
      ],
      "answer": "Gravity",
      "explanation": "Gravity pulls the ball downward, causing it to accelerate along the ramp."
    },
    {
      "question": "Increasing the height of the ramp causes the rolling ball to:",
      "options": [
        "Move more slowly",
        "Stop moving",
        "Increase its speed",
        "Change direction"
      ],
      "answer": "Increase its speed",
      "explanation": "A higher ramp gives the ball more gravitational potential energy, increasing its speed."
    },
    {
      "question": "The ramp activity demonstrates:",
      "options": [
        "Uniformly accelerated motion",
        "Uniform circular motion",
        "Oscillatory motion",
        "Random motion"
      ],
      "answer": "Uniformly accelerated motion",
      "explanation": "The ball speeds up as it rolls down the ramp due to constant acceleration from gravity."
    },
    {
      "question": "Objects resist changes in their state of motion due to:",
      "options": [
        "Gravity",
        "Friction",
        "Inertia",
        "Magnetism"
      ],
      "answer": "Inertia",
      "explanation": "Inertia is the property of matter that resists changes in motion."
    },
    {
      "question": "In the activity, the fake egg remains at rest and falls straight down because of:",
      "options": [
        "Newton's First Law of Motion",
        "Newton's Second Law of Motion",
        "Newton's Third Law of Motion",
        "Law of Gravitation"
      ],
      "answer": "Newton's First Law of Motion",
      "explanation": "The egg remains at rest due to inertia until acted upon by gravity."
    },
    {
      "question": "Newton's First Law states that an object will remain at rest or continue in uniform motion unless acted upon by:",
      "options": [
        "Balanced force",
        "Unbalanced force",
        "Friction only",
        "Gravity only"
      ],
      "answer": "Unbalanced force",
      "explanation": "Only an unbalanced external force can change an object's state of motion."
    },
    {
      "question": "The motion of the balloon demonstrates:",
      "options": [
        "Newton's First Law",
        "Newton's Second Law",
        "Newton's Third Law",
        "Law of Gravitation"
      ],
      "answer": "Newton's Third Law",
      "explanation": "The escaping air pushes backward while the balloon moves forward with an equal and opposite reaction."
    },
    {
      "question": "Releasing the air from a balloon propels it forward because:",
      "options": [
        "Every action has an equal and opposite reaction.",
        "Gravity pulls it forward.",
        "Friction pushes it.",
        "Air resistance increases."
      ],
      "answer": "Every action has an equal and opposite reaction.",
      "explanation": "The balloon moves forward due to Newton's Third Law of Motion."
    },
    {
      "question": "Newton's Second Law of Motion is represented by the formula:",
      "options": [
        "P = mv",
        "F = ma",
        "W = Fd",
        "V = IR"
      ],
      "answer": "F = ma",
      "explanation": "Newton's Second Law states that force equals mass multiplied by acceleration."
    },
    {
      "question": "If the applied force remains constant, increasing the mass of a toy car will:",
      "options": [
        "Increase its acceleration",
        "Reduce its acceleration",
        "Keep acceleration unchanged",
        "Double its speed instantly"
      ],
      "answer": "Reduce its acceleration",
      "explanation": "According to F = ma, greater mass results in lower acceleration for the same force."
    },
    {
      "question": "The toy car experiment demonstrates the relationship between:",
      "options": [
        "Force, mass and acceleration",
        "Mass and density only",
        "Work and energy",
        "Heat and temperature"
      ],
      "answer": "Force, mass and acceleration",
      "explanation": "The experiment shows how force, mass and acceleration are related by Newton's Second Law."
    },
    {
      "question": "The gravitational force acting on an object is given by the formula:",
      "options": [
        "F = ma",
        "F = mg",
        "W = Fd",
        "P = mv"
      ],
      "answer": "F = mg",
      "explanation": "The weight of an object is calculated using the formula F = mg."
    },
    {
      "question": "In free fall (ignoring air resistance), light and heavy objects:",
      "options": [
        "Fall at different rates",
        "Fall with the same acceleration",
        "Heavy objects always fall faster",
        "Light objects always fall faster"
      ],
      "answer": "Fall with the same acceleration",
      "explanation": "Without air resistance, all objects fall with the same acceleration due to gravity."
    },
    {
      "question": "A heavier object may appear to fall faster in air because of:",
      "options": [
        "Greater gravity",
        "Air resistance affecting lighter objects more",
        "Higher density only",
        "Larger volume"
      ],
      "answer": "Air resistance affecting lighter objects more",
      "explanation": "Air resistance slows lighter objects more than heavier ones."
    },
    {
      "question": "Density is calculated by dividing:",
      "options": [
        "Volume by mass",
        "Mass by volume",
        "Force by area",
        "Weight by height"
      ],
      "answer": "Mass by volume",
      "explanation": "Density is the mass of a substance divided by its volume."
    },
    {
      "question": "When an object is submerged in water, it displaces:",
      "options": [
        "Water equal to its mass",
        "Water equal to its volume",
        "Half its volume of water",
        "No water"
      ],
      "answer": "Water equal to its volume",
      "explanation": "A submerged object displaces a volume of water equal to its own volume."
    },
    {
      "question": "Water displacement helps determine the density of:",
      "options": [
        "Regular-shaped objects only",
        "Irregular-shaped objects",
        "Gases only",
        "Liquids only"
      ],
      "answer": "Irregular-shaped objects",
      "explanation": "Water displacement is used to measure the volume of irregular-shaped objects."
    },
    {
      "question": "Work is calculated as the product of:",
      "options": [
        "Mass and acceleration",
        "Force and distance",
        "Force and time",
        "Power and time"
      ],
      "answer": "Force and distance",
      "explanation": "Work done is equal to force multiplied by the distance moved in the direction of the force."
    },
    {
      "question": "Lifting an object vertically demonstrates work done against:",
      "options": [
        "Friction",
        "Magnetism",
        "Gravity",
        "Air resistance"
      ],
      "answer": "Gravity",
      "explanation": "Lifting an object requires work against the gravitational force."
    },
    {
      "question": "When an object is raised to a higher position, it stores:",
      "options": [
        "Kinetic energy",
        "Sound energy",
        "Potential energy",
        "Heat energy"
      ],
      "answer": "Potential energy",
      "explanation": "An object gains gravitational potential energy when lifted to a higher position."
    },
    {
      "question": "As a pendulum swings downward, its potential energy is converted into:",
      "options": [
        "Chemical energy",
        "Electrical energy",
        "Kinetic energy",
        "Sound energy"
      ],
      "answer": "Kinetic energy",
      "explanation": "As the pendulum moves downward, potential energy changes into kinetic energy."
    },
    {
      "question": "As the ball falls from a height, its potential energy changes into:",
      "options": [
        "Heat energy",
        "Light energy",
        "Kinetic energy",
        "Electrical energy"
      ],
      "answer": "Kinetic energy",
      "explanation": "During free fall, gravitational potential energy is converted into kinetic energy."
    },
    {
      "question": "After the ball collides with the ground, some of its kinetic energy is lost as:",
      "options": [
        "Heat, sound and deformation of the ball",
        "Light only",
        "Magnetic energy",
        "Nuclear energy"
      ],
      "answer": "Heat, sound and deformation of the ball",
      "explanation": "During impact, kinetic energy is transformed into heat, sound and deformation."
    },
    {
      "question": "Striking a tuning fork produces sound because it:",
      "options": [
        "Melts",
        "Vibrates",
        "Changes colour",
        "Expands"
      ],
      "answer": "Vibrates",
      "explanation": "Sound is produced when the tuning fork vibrates rapidly."
    },
    {
      "question": "The vibrations of the tuning fork disturb the water surface because sound energy is transferred through:",
      "options": [
        "Vacuum",
        "Air",
        "Glass only",
        "Plastic only"
      ],
      "answer": "Air",
      "explanation": "Sound travels through air and causes the water surface to vibrate."
    },
    {
      "question": "Sound waves require ________ to travel.",
      "options": [
        "A vacuum",
        "A medium such as solids, liquids or gases",
        "Sunlight",
        "Electricity"
      ],
      "answer": "A medium such as solids, liquids or gases",
      "explanation": "Sound requires a material medium and cannot travel through a vacuum."
    },
    {
      "question": "According to the lesson, sound travels fastest in:",
      "options": [
        "Gases",
        "Liquids",
        "Solids",
        "Vacuum"
      ],
      "answer": "Solids",
      "explanation": "Sound travels fastest in solids because their particles are closely packed."
    },
    {
      "question": "An echo is heard when the reflected sound reaches the ear after a minimum delay of about:",
      "options": [
        "0.01 second",
        "0.05 second",
        "0.1 second",
        "1 second"
      ],
      "answer": "0.1 second",
      "explanation": "A delay of about 0.1 second is needed for the human ear to distinguish an echo."
    },
    {
      "question": "Sound waves follow the law of reflection, which states that:",
      "options": [
        "Angle of incidence is greater than the angle of reflection",
        "Angle of incidence is equal to the angle of reflection",
        "Sound cannot be reflected",
        "Reflection occurs only in air"
      ],
      "answer": "Angle of incidence is equal to the angle of reflection",
      "explanation": "Sound reflects just like light, where the angle of incidence equals the angle of reflection."
    }
  ],
  "class9-math": [
    {
      "question": "Which method is used to find the remainder when dividing polynomials in the activity?",
      "options": [
        "Graph plotting",
        "Exploding dots",
        "Probability tree",
        "Coordinate grid"
      ],
      "answer": "Exploding dots",
      "explanation": "The exploding dots method helps visualize polynomial division and find the remainder."
    },
    {
      "question": "In the exploding dots activity, x33x25x6is divided by:",
      "options": [
        "(x + 1)",
        "(x + 2)",
        "(x – 2)",
        "(x – 1)"
      ],
      "answer": "(x + 2)",
      "explanation": "The activity demonstrates dividing the polynomial by (x + 2)."
    },
    {
      "question": "According to the activity, the remainder obtained when x33x25x6is divided by x2is:",
      "options": [
        "1",
        "2",
        "0",
        "–2"
      ],
      "answer": "0",
      "explanation": "A remainder of zero shows that the divisor divides the polynomial exactly."
    },
    {
      "question": "Since the remainder is zero, (x + 2) is a:",
      "options": [
        "Quotient",
        "Constant",
        "Factor",
        "Coefficient"
      ],
      "answer": "Factor",
      "explanation": "A polynomial is a factor if it divides another polynomial with zero remainder."
    },
    {
      "question": "Algebra tiles help students:",
      "options": [
        "Measure angles",
        "Factor polynomials visually",
        "Draw graphs",
        "Calculate area"
      ],
      "answer": "Factor polynomials visually",
      "explanation": "Algebra tiles provide a visual way to understand polynomial factorization."
    },
    {
      "question": "Which identity is visualized using algebra tiles?",
      "options": [
        "(a + b)²",
        "(x + y + z)²",
        "(a – b)²",
        "(x – y)²"
      ],
      "answer": "(x + y + z)²",
      "explanation": "Algebra tiles help visualize the expansion of x+y+z2."
    },
    {
      "question": "The expansion of x+y+z2contains:",
      "options": [
        "x² + y² + z² only",
        "x² + y² + z² + 2xy + 2yz + 2xz",
        "x² + y² + 2xy",
        "x² + yz"
      ],
      "answer": "x² + y² + z² + 2xy + 2yz + 2xz",
      "explanation": "Squaring a trinomial produces the squares of each term and twice each pairwise product."
    },
    {
      "question": "Which identity is demonstrated using cubes and cuboids?",
      "options": [
        "(x + y)²",
        "(x − y)²",
        "(x + y)³",
        "(x − y)³"
      ],
      "answer": "(x + y)³",
      "explanation": "Cubes and cuboids visually represent the expansion of x+y3."
    },
    {
      "question": "The expansion of x+y3is:",
      "options": [
        "x³ + y³",
        "x³ + 3x²y + 3xy² + y³",
        "x² + y² + 2xy",
        "x³ − y³"
      ],
      "answer": "x³ + 3x²y + 3xy² + y³",
      "explanation": "This is the standard algebraic identity for the cube of a binomial."
    },
    {
      "question": "Coordinate Geometry mainly helps students:",
      "options": [
        "Measure circles",
        "Plot points on a coordinate grid",
        "Calculate probability",
        "Construct triangles"
      ],
      "answer": "Plot points on a coordinate grid",
      "explanation": "Coordinate Geometry is used to locate and represent points using coordinates."
    },
    {
      "question": "Every point on a coordinate plane represents:",
      "options": [
        "A line",
        "A specific value",
        "An angle",
        "A polygon"
      ],
      "answer": "A specific value",
      "explanation": "Each point corresponds to a unique ordered pair of coordinates."
    },
    {
      "question": "Coordinate Geometry helps in understanding:",
      "options": [
        "Surface area",
        "Linear relationships",
        "Volume only",
        "Probability only"
      ],
      "answer": "Linear relationships",
      "explanation": "Coordinate Geometry helps represent and analyze linear relationships graphically."
    },
    {
      "question": "Graphs in Coordinate Geometry are mainly used for:",
      "options": [
        "Reading and interpreting data",
        "Measuring angles",
        "Finding factors",
        "Constructing circles"
      ],
      "answer": "Reading and interpreting data",
      "explanation": "Graphs make it easier to visualize and interpret mathematical information."
    },
    {
      "question": "The sum of the angles of a triangle is:",
      "options": [
        "90°",
        "180°",
        "270°",
        "360°"
      ],
      "answer": "180°",
      "explanation": "The interior angles of every triangle always add up to 180°."
    },
    {
      "question": "Which chapter states that the sum of the angles of a triangle is always 180°?",
      "options": [
        "Quadrilaterals",
        "Lines and Angles",
        "Polynomials",
        "Coordinate Geometry"
      ],
      "answer": "Lines and Angles",
      "explanation": "The Lines and Angles chapter explains the triangle angle sum property."
    },
    {
      "question": "The sum of the interior angles of a quadrilateral is:",
      "options": [
        "180°",
        "270°",
        "360°",
        "540°"
      ],
      "answer": "360°",
      "explanation": "The four interior angles of every quadrilateral total 360°."
    },
    {
      "question": "Which chapter discusses the angle sum property of quadrilaterals?",
      "options": [
        "Polynomials",
        "Lines and Angles",
        "Quadrilaterals",
        "Coordinate Geometry"
      ],
      "answer": "Quadrilaterals",
      "explanation": "The Quadrilaterals chapter explains the interior angle sum property."
    },
    {
      "question": "The total surface area of a cuboid is:",
      "options": [
        "lbh",
        "2(lb + bh + lh)",
        "6a²",
        "2πrh"
      ],
      "answer": "2(lb + bh + lh)",
      "explanation": "The total surface area is the sum of the areas of all six faces."
    },
    {
      "question": "The total surface area of a cube of side a is:",
      "options": [
        "a²",
        "2a²",
        "4a²",
        "6a²"
      ],
      "answer": "6a²",
      "explanation": "A cube has six equal square faces, each with area a²."
    },
    {
      "question": "Which chapter explains the formulas for the surface area of cubes, cuboids, cylinders and cones?",
      "options": [
        "Coordinate Geometry",
        "Polynomials",
        "Surface Areas and Volumes",
        "Quadrilaterals"
      ],
      "answer": "Surface Areas and Volumes",
      "explanation": "This chapter covers formulas for the surface areas and volumes of common 3D solids."
    },
    {
      "question": "Which visual method is used to divide a polynomial of degree 2 by a polynomial of degree 1?",
      "options": [
        "Coordinate graph",
        "Algebra tiles",
        "Compass",
        "Protractor"
      ],
      "answer": "Algebra tiles",
      "explanation": "Algebra tiles visually represent polynomial division and help determine the quotient."
    },
    {
      "question": "The exploding dots activity helps students understand:",
      "options": [
        "Trigonometry",
        "Polynomial division",
        "Probability",
        "Surface area"
      ],
      "answer": "Polynomial division",
      "explanation": "Exploding dots provide a visual method for dividing polynomials."
    },
    {
      "question": "If a polynomial leaves no remainder when divided by another polynomial, the divisor is called a:",
      "options": [
        "Constant",
        "Variable",
        "Factor",
        "Coefficient"
      ],
      "answer": "Factor",
      "explanation": "A divisor that leaves zero remainder is called a factor of the polynomial."
    },
    {
      "question": "Which activity visually demonstrates the identity x+y+z2?",
      "options": [
        "Coordinate plotting",
        "Algebra tiles",
        "Graph paper",
        "Compass construction"
      ],
      "answer": "Algebra tiles",
      "explanation": "Algebra tiles help visualize the expansion of x+y+z2."
    },
    {
      "question": "Cubes and cuboids are used to visualize which algebraic identity?",
      "options": [
        "x+y2",
        "x-y2",
        "x+y3",
        "x-y3"
      ],
      "answer": "x+y3",
      "explanation": "Cubes and cuboids model the expansion of the cube of a binomial."
    },
    {
      "question": "In Coordinate Geometry, every plotted point represents:",
      "options": [
        "A line",
        "A specific ordered value",
        "An angle",
        "A polygon"
      ],
      "answer": "A specific ordered value",
      "explanation": "Each plotted point is identified by a unique ordered pair of coordinates."
    },
    {
      "question": "Coordinate Geometry mainly helps students understand:",
      "options": [
        "Surface area",
        "Linear relationships",
        "Volume",
        "Angle bisectors"
      ],
      "answer": "Linear relationships",
      "explanation": "Graphs in Coordinate Geometry help represent and analyze linear relationships."
    },
    {
      "question": "Which skill is developed by studying graphs in Coordinate Geometry?",
      "options": [
        "Polynomial factorization",
        "Reading and interpreting data",
        "Measuring volumes",
        "Constructing circles"
      ],
      "answer": "Reading and interpreting data",
      "explanation": "Graphs make mathematical data easier to understand and analyze."
    },
    {
      "question": "The angle sum property discussed in the Lines and Angles chapter applies to:",
      "options": [
        "Rectangle",
        "Triangle",
        "Circle",
        "Pentagon"
      ],
      "answer": "Triangle",
      "explanation": "The three interior angles of every triangle always add up to 180°."
    },
    {
      "question": "The total measure of the angles in a triangle is:",
      "options": [
        "90°",
        "180°",
        "270°",
        "360°"
      ],
      "answer": "180°",
      "explanation": "The sum of the interior angles of a triangle is always 180°."
    },
    {
      "question": "The interior angles of every quadrilateral add up to:",
      "options": [
        "180°",
        "270°",
        "360°",
        "540°"
      ],
      "answer": "360°",
      "explanation": "Every quadrilateral has an interior angle sum of 360°."
    },
    {
      "question": "The formula 2(lb+bh+lh)is used to calculate:",
      "options": [
        "Volume of a cuboid",
        "Total surface area of a cuboid",
        "Curved surface area of a cylinder",
        "Area of a square"
      ],
      "answer": "Total surface area of a cuboid",
      "explanation": "This formula gives the total area of all six faces of a cuboid."
    },
    {
      "question": "The surface area of a cube depends on:",
      "options": [
        "Radius",
        "Height",
        "Side length",
        "Diameter"
      ],
      "answer": "Side length",
      "explanation": "The total surface area of a cube is determined by its side length."
    },
    {
      "question": "The curved surface area of a cylinder is:",
      "options": [
        "πr²",
        "2πrh",
        "2πr²",
        "πrl"
      ],
      "answer": "2πrh",
      "explanation": "The curved surface area of a cylinder equals 2πrh."
    },
    {
      "question": "The total surface area of a cylinder is:",
      "options": [
        "2πrh",
        "2πr(h+r)",
        "πr²h",
        "πrh"
      ],
      "answer": "2πr(h+r)",
      "explanation": "Total surface area equals the curved surface plus the areas of the two circular bases."
    },
    {
      "question": "The curved surface area of a cone is:",
      "options": [
        "πr²",
        "2πrh",
        "πrl",
        "2πr²"
      ],
      "answer": "πrl",
      "explanation": "The curved surface area of a cone is calculated using πrl, where l is the slant height."
    },
    {
      "question": "The total surface area of a cone is:",
      "options": [
        "πr²",
        "πr(l+r)",
        "2πrh",
        "πrl²"
      ],
      "answer": "πr(l+r)",
      "explanation": "The total surface area is the sum of the curved surface area and the base area."
    },
    {
      "question": "The volume of a cone is:",
      "options": [
        "πr²h",
        "2πr²h",
        "⅓πr²h",
        "½πr²h"
      ],
      "answer": "⅓πr²h",
      "explanation": "The volume of a cone is one-third the volume of a cylinder with the same base and height."
    },
    {
      "question": "According to the activity, the volume of a cylinder is how many times the volume of a cone with the same base and height?",
      "options": [
        "1 time",
        "2 times",
        "3 times",
        "4 times"
      ],
      "answer": "3 times",
      "explanation": "A cylinder has three times the volume of a cone with the same base radius and height."
    },
    {
      "question": "Which chapter includes formulas for cubes, cuboids, cylinders and cones?",
      "options": [
        "Coordinate Geometry",
        "Polynomials",
        "Surface Areas and Volumes",
        "Lines and Angles"
      ],
      "answer": "Surface Areas and Volumes",
      "explanation": "This chapter covers formulas related to the surface areas and volumes of common solid shapes."
    },
    {
      "question": "Which technique is used to visually verify whether a polynomial has a factor?",
      "options": [
        "Coordinate graph",
        "Exploding dots",
        "Probability chart",
        "Angle measurement"
      ],
      "answer": "Exploding dots",
      "explanation": "The exploding dots method helps determine whether a polynomial is divisible by another polynomial by checking if the remainder is zero."
    },
    {
      "question": "Which activity helps arrange a polynomial into a rectangular form?",
      "options": [
        "Coordinate plotting",
        "Algebra tiles",
        "Clinometer",
        "Compass construction"
      ],
      "answer": "Algebra tiles",
      "explanation": "Algebra tiles provide a visual representation of polynomial terms, making it easier to arrange and factor them."
    },
    {
      "question": "The identity x+y+z2contains how many cross-product terms?",
      "options": [
        "One",
        "Two",
        "Three",
        "Four"
      ],
      "answer": "Three",
      "explanation": "The expansion includes the cross-product terms 2xy, 2yz, and 2xz."
    },
    {
      "question": "Which term appears in the expansion of x+y+z2?",
      "options": [
        "3xyz",
        "2xy",
        "x²y²",
        "yz²"
      ],
      "answer": "2xy",
      "explanation": "The expansion is x2+y2+z2+2xy+2yz+2xz, so 2xyis one of the terms."
    },
    {
      "question": "The identity x+y3contains how many terms?",
      "options": [
        "Two",
        "Three",
        "Four",
        "Five"
      ],
      "answer": "Four",
      "explanation": "The expansion is x3+3x2y+3xy2+y3, which has four terms."
    },
    {
      "question": "Which of the following is the last term of x+y3?",
      "options": [
        "x³",
        "3x²y",
        "3xy²",
        "y³"
      ],
      "answer": "y³",
      "explanation": "The final term in the expansion of x+y3is y3."
    },
    {
      "question": "In Coordinate Geometry, plotting points helps to:",
      "options": [
        "Find surface area",
        "Understand linear relationships",
        "Measure volume",
        "Divide polynomials"
      ],
      "answer": "Understand linear relationships",
      "explanation": "Plotting points on a coordinate plane helps students understand graphs and relationships between variables."
    },
    {
      "question": "Which chapter introduces plotting points on a coordinate grid?",
      "options": [
        "Polynomials",
        "Coordinate Geometry",
        "Quadrilaterals",
        "Surface Areas and Volumes"
      ],
      "answer": "Coordinate Geometry",
      "explanation": "The Coordinate Geometry chapter teaches students how to plot and interpret points on a coordinate plane."
    },
    {
      "question": "The sum of the interior angles of a triangle is always:",
      "options": [
        "120°",
        "180°",
        "270°",
        "360°"
      ],
      "answer": "180°",
      "explanation": "The angle sum property states that the interior angles of every triangle add up to 180°."
    },
    {
      "question": "Which statement about a quadrilateral is correct?",
      "options": [
        "Interior angles sum to 180°",
        "Interior angles sum to 270°",
        "Interior angles sum to 360°",
        "Interior angles sum to 540°"
      ],
      "answer": "Interior angles sum to 360°",
      "explanation": "The total measure of the four interior angles of any quadrilateral is 360°."
    },
    {
      "question": "The formula 6a2is used to find the:",
      "options": [
        "Volume of a cube",
        "Total surface area of a cube",
        "Curved surface area of a cylinder",
        "Area of a square"
      ],
      "answer": "Total surface area of a cube",
      "explanation": "A cube has six equal square faces, each with area a2, giving a total surface area of 6a2."
    },
    {
      "question": "Which solid has six equal square faces?",
      "options": [
        "Cone",
        "Cuboid",
        "Cube",
        "Cylinder"
      ],
      "answer": "Cube",
      "explanation": "A cube consists of six congruent square faces."
    },
    {
      "question": "The bases of a cylinder are:",
      "options": [
        "Squares",
        "Triangles",
        "Circles",
        "Rectangles"
      ],
      "answer": "Circles",
      "explanation": "A cylinder has two identical circular bases connected by a curved surface."
    },
    {
      "question": "The symbol lin the formula πrlrepresents the:",
      "options": [
        "Length",
        "Breadth",
        "Slant height",
        "Radius"
      ],
      "answer": "Slant height",
      "explanation": "In the curved surface area formula of a cone, ldenotes the slant height."
    },
    {
      "question": "The total surface area of a cone includes:",
      "options": [
        "Only curved surface",
        "Curved surface and base",
        "Only circular base",
        "Height and radius only"
      ],
      "answer": "Curved surface and base",
      "explanation": "Total surface area equals the curved surface area plus the area of the circular base."
    },
    {
      "question": "Which formula represents the volume of a cone?",
      "options": [
        "πr2h",
        "13πr2h",
        "2πrh",
        "πrl"
      ],
      "answer": "13πr2h",
      "explanation": "The volume of a cone is one-third the volume of a cylinder with the same base radius and height."
    },
    {
      "question": "A cylinder and a cone having the same base and height satisfy which relationship?",
      "options": [
        "Same volume",
        "Cone has twice the volume",
        "Cylinder has three times the volume",
        "Cone has three times the volume"
      ],
      "answer": "Cylinder has three times the volume",
      "explanation": "A cylinder's volume is three times that of a cone with the same base radius and height."
    },
    {
      "question": "Which chapter focuses on formulas for curved and total surface areas?",
      "options": [
        "Polynomials",
        "Coordinate Geometry",
        "Surface Areas and Volumes",
        "Lines and Angles"
      ],
      "answer": "Surface Areas and Volumes",
      "explanation": "This chapter covers formulas for the surface areas and volumes of various solids."
    },
    {
      "question": "Which visual aid is specifically mentioned for polynomial factorization?",
      "options": [
        "Geoboard",
        "Algebra tiles",
        "Spinner",
        "Clinometer"
      ],
      "answer": "Algebra tiles",
      "explanation": "Algebra tiles help students understand polynomial operations through visual models."
    },
    {
      "question": "Which statement is true according to the Study Hub activities?",
      "options": [
        "Coordinate Geometry is used to calculate cylinder volume.",
        "Algebra tiles help visualize polynomial identities and factorization.",
        "Triangle angle sum is 360°.",
        "The volume of a cone equals the volume of a cylinder."
      ],
      "answer": "Algebra tiles help visualize polynomial identities and factorization.",
      "explanation": "Algebra tiles are used to demonstrate polynomial identities, factorization, and algebraic operations visually."
    },
    {
      "question": "Which visual tool is specifically used to understand polynomial factorization by arranging pieces into a rectangle?",
      "options": [
        "Compass",
        "Algebra tiles",
        "Geoboard",
        "Protractor"
      ],
      "answer": "Algebra tiles",
      "explanation": "Algebra tiles allow students to arrange polynomial terms into rectangular patterns, making factorization easier to understand visually."
    },
    {
      "question": "The exploding dots activity proves that x2is a factor because:",
      "options": [
        "The quotient is 2",
        "The remainder is zero",
        "The polynomial has degree 2",
        "The coefficient of xis 2"
      ],
      "answer": "The remainder is zero",
      "explanation": "A polynomial is divisible by another polynomial if the remainder after division is zero. Therefore, x2is a factor."
    },
    {
      "question": "Which of the following is NOT mentioned as a learning outcome of Coordinate Geometry?",
      "options": [
        "Plotting points on a coordinate grid",
        "Understanding linear relationships",
        "Reading and interpreting graphs",
        "Finding the distance between two points"
      ],
      "answer": "Finding the distance between two points",
      "explanation": "The Study Hub activities focus on plotting points, graph interpretation, and understanding linear relationships, but not on the distance formula."
    },
    {
      "question": "The chapter Lines and Angles emphasizes that the sum of the angles in any triangle is:",
      "options": [
        "90°",
        "180°",
        "270°",
        "360°"
      ],
      "answer": "180°",
      "explanation": "The Angle Sum Property states that the three interior angles of every triangle always add up to 180°."
    },
    {
      "question": "The angle sum property of a quadrilateral states that its interior angles total:",
      "options": [
        "180°",
        "270°",
        "360°",
        "540°"
      ],
      "answer": "360°",
      "explanation": "Every quadrilateral has four interior angles whose total measure is 360°."
    },
    {
      "question": "Which formula gives the curved surface area of a cylinder?",
      "options": [
        "2πr(h+r)",
        "2πrh",
        "πr2",
        "πrl"
      ],
      "answer": "2πrh",
      "explanation": "The curved (lateral) surface area of a cylinder is calculated using the formula 2πrh."
    },
    {
      "question": "Which formula gives the total surface area of a cone?",
      "options": [
        "πrl",
        "πr(l+r)",
        "2πrh",
        "πr2h"
      ],
      "answer": "πr(l+r)",
      "explanation": "The total surface area of a cone is the sum of its curved surface area and base area, given by πr(l+r)."
    },
    {
      "question": "If a cylinder and a cone have the same base radius and height, the volume of the cone is:",
      "options": [
        "Equal to the cylinder",
        "Half the cylinder",
        "One-third the cylinder",
        "Three times the cylinder"
      ],
      "answer": "One-third the cylinder",
      "explanation": "The volume of a cone is 13πr2h, which is one-third the volume of a cylinder with the same base and height."
    },
    {
      "question": "Which chapter includes the formulas for the surface areas of cubes, cuboids, cylinders, and cones?",
      "options": [
        "Coordinate Geometry",
        "Lines and Angles",
        "Surface Areas and Volumes",
        "Polynomials"
      ],
      "answer": "Surface Areas and Volumes",
      "explanation": "The Surface Areas and Volumes chapter introduces formulas for calculating the surface areas and volumes of various three-dimensional solids."
    },
    {
      "question": "According to the Study Hub activities, which statement is correct?",
      "options": [
        "The volume of a cone is greater than that of a cylinder with the same base and height.",
        "Graphs in Coordinate Geometry are used for reading and interpreting data.",
        "The angle sum of a quadrilateral is 180°.",
        "Exploding dots are used to find the surface area of a cube."
      ],
      "answer": "Graphs in Coordinate Geometry are used for reading and interpreting data.",
      "explanation": "Coordinate Geometry teaches students to plot points, draw graphs, and interpret data, helping them understand relationships between variables."
    }
  ],
  "class10-science": [
    {
      "question": "Which of the following indicates that a chemical reaction has taken place?",
      "options": [
        "Melting of ice",
        "Formation of a precipitate",
        "Breaking of glass",
        "Dissolving sugar in water"
      ],
      "answer": "Formation of a precipitate",
      "explanation": "A precipitate is a new solid formed, indicating that a chemical reaction has occurred."
    },
    {
      "question": "What gas is produced when hydrochloric acid reacts with baking soda?",
      "options": [
        "Oxygen",
        "Hydrogen",
        "Carbon dioxide",
        "Nitrogen"
      ],
      "answer": "Carbon dioxide",
      "explanation": "Hydrochloric acid reacts with baking soda to release carbon dioxide gas."
    },
    {
      "question": "Which metal reacts more vigorously with hydrochloric acid?",
      "options": [
        "Iron",
        "Copper",
        "Aluminium",
        "Silver"
      ],
      "answer": "Aluminium",
      "explanation": "Aluminium is more reactive than iron, copper, and silver, so it reacts more vigorously."
    },
    {
      "question": "In soap-making, sodium hydroxide reacts with oil to produce:",
      "options": [
        "Vinegar",
        "Soap",
        "Alcohol",
        "Calcium carbonate"
      ],
      "answer": "Soap",
      "explanation": "Sodium hydroxide reacts with oils or fats in the saponification process to form soap."
    },
    {
      "question": "Passing exhaled air through lime water turns it milky due to the presence of:",
      "options": [
        "Oxygen",
        "Carbon dioxide",
        "Hydrogen",
        "Nitrogen"
      ],
      "answer": "Carbon dioxide",
      "explanation": "Exhaled air contains carbon dioxide, which turns lime water milky."
    },
    {
      "question": "Which part of a neuron receives nerve impulses?",
      "options": [
        "Axon",
        "Cell body",
        "Dendrites",
        "Nucleus"
      ],
      "answer": "Dendrites",
      "explanation": "Dendrites receive nerve impulses and carry them toward the cell body."
    },
    {
      "question": "Pollination is the transfer of pollen from:",
      "options": [
        "Ovary to stigma",
        "Anther to stigma",
        "Stigma to anther",
        "Petal to ovary"
      ],
      "answer": "Anther to stigma",
      "explanation": "Pollination is the transfer of pollen grains from the anther to the stigma."
    },
    {
      "question": "Which phenotypic ratio is observed in a monohybrid cross?",
      "options": [
        "9 : 3 : 3 : 1",
        "3 : 1",
        "1 : 2 : 1",
        "2 : 1"
      ],
      "answer": "3 : 1",
      "explanation": "A monohybrid cross produces a phenotypic ratio of 3 dominant : 1 recessive."
    },
    {
      "question": "According to the Second Law of Reflection:",
      "options": [
        "Angle of refraction equals angle of incidence.",
        "Angle of reflection equals angle of incidence.",
        "Reflection occurs only in mirrors.",
        "Light always bends toward the normal."
      ],
      "answer": "Angle of reflection equals angle of incidence.",
      "explanation": "The angle of reflection is always equal to the angle of incidence."
    },
    {
      "question": "Which electrical component opposes the flow of current?",
      "options": [
        "Switch",
        "Battery",
        "Resistor",
        "Bulb"
      ],
      "answer": "Resistor",
      "explanation": "A resistor limits or opposes the flow of electric current in a circuit."
    },
    {
      "question": "Wrapping a wire into a coil around an iron nail produces a:",
      "options": [
        "Permanent magnet",
        "Compass",
        "Electromagnet",
        "Generator"
      ],
      "answer": "Electromagnet",
      "explanation": "Passing electric current through a coil around an iron nail creates an electromagnet."
    },
    {
      "question": "Burning magnesium ribbon forms:",
      "options": [
        "Magnesium chloride",
        "Magnesium oxide",
        "Magnesium sulphate",
        "Magnesium nitrate"
      ],
      "answer": "Magnesium oxide",
      "explanation": "Magnesium combines with oxygen on burning to form magnesium oxide."
    },
    {
      "question": "A substance with a pH greater than 7 is:",
      "options": [
        "Acidic",
        "Neutral",
        "Basic",
        "Salty"
      ],
      "answer": "Basic",
      "explanation": "A pH value greater than 7 indicates that the substance is basic (alkaline)."
    },
    {
      "question": "Metals conduct electricity because they contain:",
      "options": [
        "Air pockets",
        "Free electrons",
        "Water molecules",
        "Carbon atoms"
      ],
      "answer": "Free electrons",
      "explanation": "Free electrons move easily through metals, allowing electric current to flow."
    },
    {
      "question": "Which cleansing agent works well even in hard water?",
      "options": [
        "Soap",
        "Detergent",
        "Lime",
        "Bleaching powder"
      ],
      "answer": "Detergent",
      "explanation": "Detergents do not form scum and clean effectively even in hard water."
    },
    {
      "question": "The tiny openings present on the surface of leaves are called:",
      "options": [
        "Veins",
        "Stomata",
        "Guard cells",
        "Petioles"
      ],
      "answer": "Stomata",
      "explanation": "Stomata are tiny pores that allow the exchange of gases in plants."
    },
    {
      "question": "Which evidence strongly supports evolution?",
      "options": [
        "Fossils",
        "Clouds",
        "Soil texture",
        "Rainfall"
      ],
      "answer": "Fossils",
      "explanation": "Fossils provide evidence of organisms that lived in the past and support evolution."
    },
    {
      "question": "Refraction is the bending of light when it:",
      "options": [
        "Hits a mirror",
        "Passes from one medium to another",
        "Travels in a vacuum",
        "Is blocked by an object"
      ],
      "answer": "Passes from one medium to another",
      "explanation": "Light bends because its speed changes when it enters a different medium."
    },
    {
      "question": "Electrical power depends on:",
      "options": [
        "Voltage, current and resistance",
        "Only resistance",
        "Only current",
        "Only voltage"
      ],
      "answer": "Voltage, current and resistance",
      "explanation": "Electrical power depends on voltage and current, while resistance affects both."
    },
    {
      "question": "Which device converts electrical energy into mechanical energy?",
      "options": [
        "Generator",
        "Electric motor",
        "Transformer",
        "Resistor"
      ],
      "answer": "Electric motor",
      "explanation": "An electric motor converts electrical energy into mechanical energy by producing motion."
    },
    {
      "question": "Which gas is confirmed by the pop test?",
      "options": [
        "Oxygen",
        "Carbon dioxide",
        "Hydrogen",
        "Nitrogen"
      ],
      "answer": "Hydrogen",
      "explanation": "Hydrogen gas burns with a characteristic \"pop\" sound during the pop test."
    },
    {
      "question": "Why is salt added during soap preparation?",
      "options": [
        "To increase colour",
        "To separate soap from the reaction mixture",
        "To increase foam",
        "To dissolve oil"
      ],
      "answer": "To separate soap from the reaction mixture",
      "explanation": "Salt helps separate the soap from the reaction mixture during soap preparation."
    },
    {
      "question": "Which cells regulate the opening and closing of stomata?",
      "options": [
        "Epidermal cells",
        "Guard cells",
        "Xylem cells",
        "Phloem cells"
      ],
      "answer": "Guard cells",
      "explanation": "Guard cells control the opening and closing of stomata to regulate gas exchange."
    },
    {
      "question": "The nucleus in a neuron is present in the:",
      "options": [
        "Axon",
        "Dendrite",
        "Cell body",
        "Nerve ending"
      ],
      "answer": "Cell body",
      "explanation": "The nucleus is located in the neuron's cell body, which controls its activities."
    },
    {
      "question": "Which part of a flower receives pollen grains?",
      "options": [
        "Anther",
        "Ovary",
        "Stigma",
        "Sepal"
      ],
      "answer": "Stigma",
      "explanation": "The stigma is the sticky part of the flower that receives pollen during pollination."
    },
    {
      "question": "The phenotypic ratio of a dihybrid cross is:",
      "options": [
        "3 : 1",
        "9 : 3 : 3 : 1",
        "1 : 2 : 1",
        "2 : 1"
      ],
      "answer": "9 : 3 : 3 : 1",
      "explanation": "A dihybrid cross produces a phenotypic ratio of 9 : 3 : 3 : 1."
    },
    {
      "question": "Refraction occurs because light:",
      "options": [
        "Stops moving",
        "Changes speed in different media",
        "Becomes brighter",
        "Gets absorbed"
      ],
      "answer": "Changes speed in different media",
      "explanation": "Light bends because its speed changes when it passes from one medium to another."
    },
    {
      "question": "Which quantity is measured in watts?",
      "options": [
        "Resistance",
        "Voltage",
        "Electric power",
        "Current"
      ],
      "answer": "Electric power",
      "explanation": "The watt (W) is the SI unit used to measure electric power."
    },
    {
      "question": "Iron filings help us to observe:",
      "options": [
        "Electric current",
        "Heat energy",
        "Magnetic field lines",
        "Sound waves"
      ],
      "answer": "Magnetic field lines",
      "explanation": "Iron filings align along magnetic field lines, making the field pattern visible."
    },
    {
      "question": "Which reaction releases heat and light?",
      "options": [
        "Neutralization",
        "Combustion",
        "Dissolution",
        "Filtration"
      ],
      "answer": "Combustion",
      "explanation": "Combustion is an exothermic reaction that releases both heat and light."
    },
    {
      "question": "Which substance turns red litmus paper blue?",
      "options": [
        "Vinegar",
        "Sodium hydroxide",
        "Hydrochloric acid",
        "Lemon juice"
      ],
      "answer": "Sodium hydroxide",
      "explanation": "Sodium hydroxide is a base that turns red litmus paper blue."
    },
    {
      "question": "Which property makes metals good conductors of electricity?",
      "options": [
        "Presence of free electrons",
        "High density",
        "High melting point",
        "Hardness"
      ],
      "answer": "Presence of free electrons",
      "explanation": "Free electrons move easily through metals, allowing electric current to flow."
    },
    {
      "question": "Soap molecules contain:",
      "options": [
        "Only hydrophobic ends",
        "Only hydrophilic ends",
        "Both hydrophobic and hydrophilic ends",
        "Neither end"
      ],
      "answer": "Both hydrophobic and hydrophilic ends",
      "explanation": "Soap molecules have a water-attracting end and an oil-attracting end, enabling effective cleaning."
    },
    {
      "question": "Lime water turns milky because carbon dioxide forms:",
      "options": [
        "Calcium chloride",
        "Calcium carbonate",
        "Calcium oxide",
        "Calcium sulphate"
      ],
      "answer": "Calcium carbonate",
      "explanation": "Carbon dioxide reacts with lime water to form calcium carbonate, which appears milky."
    },
    {
      "question": "Which part of the human brain controls balance and posture?",
      "options": [
        "Cerebrum",
        "Cerebellum",
        "Medulla",
        "Spinal cord"
      ],
      "answer": "Cerebellum",
      "explanation": "The cerebellum coordinates body balance, posture, and muscle movements."
    },
    {
      "question": "Homologous organs have:",
      "options": [
        "Different origin and similar function",
        "Similar origin and different functions",
        "Same structure only",
        "Same function only"
      ],
      "answer": "Similar origin and different functions",
      "explanation": "Homologous organs share a common evolutionary origin but perform different functions."
    },
    {
      "question": "Snell's Law relates:",
      "options": [
        "Current and voltage",
        "Reflection and absorption",
        "Angle of incidence and angle of refraction",
        "Power and resistance"
      ],
      "answer": "Angle of incidence and angle of refraction",
      "explanation": "Snell's Law describes how light bends by relating the angles of incidence and refraction."
    },
    {
      "question": "High resistance in a circuit results in:",
      "options": [
        "Higher current",
        "Lower current",
        "No change in current",
        "Infinite current"
      ],
      "answer": "Lower current",
      "explanation": "According to Ohm's Law, increasing resistance decreases the current."
    },
    {
      "question": "Increasing the number of turns in a coil will:",
      "options": [
        "Weaken the magnetic field",
        "Strengthen the magnetic field",
        "Stop the current",
        "Reduce voltage"
      ],
      "answer": "Strengthen the magnetic field",
      "explanation": "More turns in the coil produce a stronger magnetic field."
    },
    {
      "question": "Mixing lead nitrate with potassium iodide produces a:",
      "options": [
        "Blue solution",
        "Yellow precipitate",
        "Colourless gas",
        "White powder"
      ],
      "answer": "Yellow precipitate",
      "explanation": "Lead nitrate reacts with potassium iodide to form a yellow precipitate of lead iodide."
    },
    {
      "question": "Which observation confirms the formation of a chemical reaction when lead nitrate is mixed with potassium iodide?",
      "options": [
        "Evolution of oxygen",
        "Formation of a yellow precipitate",
        "Increase in volume",
        "Change in smell"
      ],
      "answer": "Formation of a yellow precipitate",
      "explanation": "The formation of a yellow lead iodide precipitate confirms that a chemical reaction has occurred."
    },
    {
      "question": "Universal pH paper is used to determine:",
      "options": [
        "Density",
        "Temperature",
        "Acidity or basicity",
        "Solubility"
      ],
      "answer": "Acidity or basicity",
      "explanation": "Universal pH paper indicates whether a substance is acidic, neutral, or basic."
    },
    {
      "question": "Which gas is produced when metals react with hydrochloric acid?",
      "options": [
        "Oxygen",
        "Carbon dioxide",
        "Hydrogen",
        "Chlorine"
      ],
      "answer": "Hydrogen",
      "explanation": "Reactive metals produce hydrogen gas when they react with hydrochloric acid."
    },
    {
      "question": "Which substance is mainly responsible for removing permanent hardness of water?",
      "options": [
        "Washing soda",
        "Vinegar",
        "Sugar",
        "Salt"
      ],
      "answer": "Washing soda",
      "explanation": "Washing soda removes permanent hardness by precipitating calcium and magnesium ions."
    },
    {
      "question": "Respiration is essential because it:",
      "options": [
        "Produces chlorophyll",
        "Produces energy",
        "Forms roots",
        "Absorbs minerals"
      ],
      "answer": "Produces energy",
      "explanation": "Respiration releases energy needed for all life processes."
    },
    {
      "question": "Which part of a neuron controls its activities?",
      "options": [
        "Axon",
        "Dendrite",
        "Nucleus",
        "Synapse"
      ],
      "answer": "Nucleus",
      "explanation": "The nucleus controls and coordinates all activities of the neuron."
    },
    {
      "question": "Flowers contain both male and female reproductive organs known as:",
      "options": [
        "Root and stem",
        "Stamen and pistil",
        "Petal and sepal",
        "Ovule and seed"
      ],
      "answer": "Stamen and pistil",
      "explanation": "The stamen is the male reproductive organ and the pistil is the female reproductive organ of a flower."
    },
    {
      "question": "Which traits determine the phenotype of an organism?",
      "options": [
        "Temporary traits only",
        "Dominant and recessive traits",
        "Environmental factors only",
        "Acquired characters"
      ],
      "answer": "Dominant and recessive traits",
      "explanation": "An organism's phenotype depends on the expression of dominant and recessive traits."
    },
    {
      "question": "The First Law of Reflection states that the incident ray, reflected ray and normal lie in:",
      "options": [
        "Different planes",
        "The same plane",
        "Parallel planes",
        "Opposite directions"
      ],
      "answer": "The same plane",
      "explanation": "The incident ray, reflected ray, and the normal always lie in the same plane."
    },
    {
      "question": "Which formula can be used to calculate electrical power?",
      "options": [
        "P = VI",
        "P = IR",
        "P = V/R",
        "P = I/R"
      ],
      "answer": "P = VI",
      "explanation": "Electrical power is calculated by multiplying voltage by current (P = VI)."
    },
    {
      "question": "Magnetic field lines are denser near the:",
      "options": [
        "Centre",
        "Poles",
        "Handle",
        "Edges"
      ],
      "answer": "Poles",
      "explanation": "Magnetic field lines are most concentrated near the poles, where the magnetic field is strongest."
    },
    {
      "question": "Burning magnesium is an example of which type of reaction?",
      "options": [
        "Decomposition reaction",
        "Combination reaction",
        "Double displacement reaction",
        "Neutralization reaction"
      ],
      "answer": "Combination reaction",
      "explanation": "Magnesium combines with oxygen to form magnesium oxide, making it a combination reaction."
    },
    {
      "question": "Which of the following is an acidic substance according to the pH scale?",
      "options": [
        "Sodium hydroxide",
        "Pure water",
        "Hydrochloric acid",
        "Washing soda"
      ],
      "answer": "Hydrochloric acid",
      "explanation": "Hydrochloric acid has a pH below 7, so it is acidic."
    },
    {
      "question": "Which instrument helps identify whether a material conducts electricity?",
      "options": [
        "Barometer",
        "Continuity tester",
        "Thermometer",
        "Hygrometer"
      ],
      "answer": "Continuity tester",
      "explanation": "A continuity tester checks whether electric current can pass through a material."
    },
    {
      "question": "Soap molecules remove grease because they contain:",
      "options": [
        "Only acidic groups",
        "Only basic groups",
        "Hydrophobic and hydrophilic ends",
        "Only salt particles"
      ],
      "answer": "Hydrophobic and hydrophilic ends",
      "explanation": "Soap molecules have one end that attracts oil and another that attracts water, helping remove grease."
    },
    {
      "question": "Stomata mainly help in:",
      "options": [
        "Seed germination",
        "Gas exchange",
        "Food storage",
        "Water absorption"
      ],
      "answer": "Gas exchange",
      "explanation": "Stomata allow the exchange of oxygen and carbon dioxide between the plant and the atmosphere."
    },
    {
      "question": "Analogous organs have:",
      "options": [
        "Similar origin but different functions",
        "Different origin but similar functions",
        "Same origin and same function",
        "No structural differences"
      ],
      "answer": "Different origin but similar functions",
      "explanation": "Analogous organs perform similar functions but evolved from different origins."
    },
    {
      "question": "The index of refraction indicates:",
      "options": [
        "The colour of light",
        "The amount by which light bends",
        "The speed of sound",
        "The strength of a magnet"
      ],
      "answer": "The amount by which light bends",
      "explanation": "The refractive index measures how much light bends when it enters a medium."
    },
    {
      "question": "Which material offers comparatively higher resistance to current according to the activity?",
      "options": [
        "Copper wire",
        "Nichrome wire",
        "Silver wire",
        "Aluminium foil"
      ],
      "answer": "Nichrome wire",
      "explanation": "Nichrome has a higher electrical resistance than copper, silver, or aluminium."
    },
    {
      "question": "What happens if the direction of current in a current-carrying coil is reversed?",
      "options": [
        "The magnetic field direction reverses",
        "The coil melts immediately",
        "Current stops completely",
        "Resistance becomes zero"
      ],
      "answer": "The magnetic field direction reverses",
      "explanation": "Reversing the current reverses the direction of the magnetic field produced by the coil."
    },
    {
      "question": "Iron displaces copper from copper sulphate solution because:",
      "options": [
        "Iron is less reactive than copper.",
        "Iron is more reactive than copper.",
        "Copper is more reactive than iron.",
        "Iron is a non-metal."
      ],
      "answer": "Iron is more reactive than copper.",
      "explanation": "Iron, being more reactive than copper, displaces it from copper sulphate solution."
    },
    {
      "question": "Which substance releases chlorine gas that bleaches litmus paper?",
      "options": [
        "Baking soda",
        "Washing soda",
        "Bleaching powder",
        "Vinegar"
      ],
      "answer": "Bleaching powder",
      "explanation": "Bleaching powder releases chlorine gas, which has bleaching properties."
    },
    {
      "question": "Why should rust or insulation be removed before testing conductivity?",
      "options": [
        "To make the sample heavier",
        "To obtain accurate conductivity results",
        "To increase resistance",
        "To change the colour of the sample"
      ],
      "answer": "To obtain accurate conductivity results",
      "explanation": "Removing rust or insulation ensures proper electrical contact for accurate conductivity testing."
    },
    {
      "question": "Which property of soap enables it to clean oily surfaces?",
      "options": [
        "High melting point",
        "Ability to form emulsions",
        "Metallic nature",
        "Acidic nature"
      ],
      "answer": "Ability to form emulsions",
      "explanation": "Soap forms emulsions that allow oil and grease to mix with water and be washed away."
    },
    {
      "question": "Which plant process is demonstrated by observing stomata?",
      "options": [
        "Digestion",
        "Photosynthesis and transpiration",
        "Seed dispersal",
        "Germination"
      ],
      "answer": "Photosynthesis and transpiration",
      "explanation": "Stomata are involved in gas exchange for photosynthesis and water loss through transpiration."
    },
    {
      "question": "Which hormone helps regulate blood sugar levels?",
      "options": [
        "Thyroxine",
        "Insulin",
        "Adrenaline",
        "Estrogen"
      ],
      "answer": "Insulin",
      "explanation": "Insulin regulates blood sugar by helping cells absorb glucose from the bloodstream."
    },
    {
      "question": "Which lens is used to correct myopia?",
      "options": [
        "Convex lens",
        "Concave lens",
        "Cylindrical lens",
        "Bifocal lens"
      ],
      "answer": "Concave lens",
      "explanation": "A concave lens diverges light rays and corrects short-sightedness (myopia)."
    },
    {
      "question": "Which appliance has the highest power rating among the following?",
      "options": [
        "LED bulb",
        "Ceiling fan",
        "Electric iron",
        "Doorbell"
      ],
      "answer": "Electric iron",
      "explanation": "An electric iron consumes much more electrical power than the other listed appliances."
    },
    {
      "question": "Which statement about resistance is correct?",
      "options": [
        "Higher resistance allows more current to flow.",
        "Lower resistance reduces current.",
        "Higher resistance results in lower current.",
        "Resistance has no effect on current."
      ],
      "answer": "Higher resistance results in lower current.",
      "explanation": "According to Ohm's Law, increasing resistance decreases the flow of current."
    },
    {
      "question": "Why does an electromagnet stop attracting objects when the current is switched off?",
      "options": [
        "The iron core melts.",
        "The magnetic field disappears when current stops.",
        "The wire breaks automatically.",
        "The coil becomes a permanent magnet."
      ],
      "answer": "The magnetic field disappears when current stops.",
      "explanation": "An electromagnet works only while electric current flows; switching off the current removes the magnetic field."
    }
  ],
  "class10-math": [
    {
      "question": "Algebra tiles are mainly used to:",
      "options": [
        "Measure angles",
        "Find the factors and roots of a quadratic polynomial",
        "Draw circles",
        "Calculate probability"
      ],
      "answer": "Find the factors and roots of a quadratic polynomial",
      "explanation": "Algebra tiles visually represent quadratic expressions, making it easier to find their factors and roots."
    },
    {
      "question": "While completing the square using algebra tiles, the x-tiles are divided into:",
      "options": [
        "Three equal groups",
        "Four equal groups",
        "Two equal groups",
        "Five equal groups"
      ],
      "answer": "Two equal groups",
      "explanation": "The x-tiles are divided into two equal groups to form the sides of a perfect square."
    },
    {
      "question": "The sum of the first n natural numbers is:",
      "options": [
        "n²",
        "n(n + 1)/2",
        "2n",
        "n(n − 1)"
      ],
      "answer": "n(n + 1)/2",
      "explanation": "The formula n(n + 1)/2 gives the sum of the first n natural numbers."
    },
    {
      "question": "The sum of the first n even numbers is:",
      "options": [
        "n²",
        "n(n + 1)",
        "n(n + 1)/2",
        "2n + 1"
      ],
      "answer": "n(n + 1)",
      "explanation": "Adding the first n even numbers always results in n(n + 1)."
    },
    {
      "question": "The sum of the first n odd numbers is equal to:",
      "options": [
        "2n",
        "n(n + 1)",
        "n²",
        "n(n − 1)/2"
      ],
      "answer": "n²",
      "explanation": "The sum of the first n odd numbers always forms a perfect square, n²."
    },
    {
      "question": "A line drawn parallel to one side of a triangle divides the other two sides:",
      "options": [
        "Unequally",
        "In equal proportion",
        "At right angles",
        "Randomly"
      ],
      "answer": "In equal proportion",
      "explanation": "According to the Basic Proportionality Theorem, the two sides are divided in equal proportion."
    },
    {
      "question": "Which activity helps derive the distance formula?",
      "options": [
        "Compass construction",
        "Geoboard with rubber bands",
        "Dice experiment",
        "Clinometer"
      ],
      "answer": "Geoboard with rubber bands",
      "explanation": "A geoboard with rubber bands helps visualize and derive the distance formula."
    },
    {
      "question": "The sine of an angle is equal to the cosine of its:",
      "options": [
        "Double angle",
        "Supplementary angle",
        "Complementary angle",
        "Reflex angle"
      ],
      "answer": "Complementary angle",
      "explanation": "The identity sin θ = cos (90° − θ) relates complementary angles."
    },
    {
      "question": "Which trigonometric ratio equals the sine of the complementary angle?",
      "options": [
        "Tan",
        "Cot",
        "Cos",
        "Sec"
      ],
      "answer": "Cos",
      "explanation": "The sine of an angle equals the cosine of its complementary angle."
    },
    {
      "question": "A clinometer is used to measure:",
      "options": [
        "Area of a circle",
        "Height of an object",
        "Length of a line",
        "Radius of a circle"
      ],
      "answer": "Height of an object",
      "explanation": "A clinometer measures angles of elevation to calculate the height of objects."
    },
    {
      "question": "If the angle of elevation is 45°, then the height of the object is:",
      "options": [
        "Half the distance",
        "Double the distance",
        "Equal to the distance from the object",
        "Zero"
      ],
      "answer": "Equal to the distance from the object",
      "explanation": "Since tan 45° = 1, the height is equal to the horizontal distance."
    },
    {
      "question": "The base of the parallelogram formed from a circle is equal to:",
      "options": [
        "Radius",
        "Diameter",
        "Half the circumference",
        "Quarter of the circumference"
      ],
      "answer": "Half the circumference",
      "explanation": "Rearranging circle sectors forms a parallelogram with a base equal to half the circle's circumference."
    },
    {
      "question": "The height of the parallelogram formed from a circle is:",
      "options": [
        "Diameter",
        "Radius",
        "Circumference",
        "Chord"
      ],
      "answer": "Radius",
      "explanation": "The height of the formed parallelogram is equal to the radius of the circle."
    },
    {
      "question": "The area of a circle is:",
      "options": [
        "2πr",
        "πr²",
        "πd",
        "2πr²"
      ],
      "answer": "πr²",
      "explanation": "The area of a circle is calculated using the formula πr²."
    },
    {
      "question": "As the number of trials increases, experimental probability becomes closer to:",
      "options": [
        "Zero",
        "One",
        "Theoretical probability",
        "Impossible probability"
      ],
      "answer": "Theoretical probability",
      "explanation": "More trials make the experimental probability approach the theoretical probability."
    },
    {
      "question": "Which law states that repeated experiments produce results closer to the expected value?",
      "options": [
        "Pythagoras Theorem",
        "Law of Large Numbers",
        "Midpoint Theorem",
        "Binomial Theorem"
      ],
      "answer": "Law of Large Numbers",
      "explanation": "The Law of Large Numbers states that experimental results become closer to expected values as trials increase."
    },
    {
      "question": "A bell-shaped graph represents:",
      "options": [
        "Linear distribution",
        "Uniform distribution",
        "Normal distribution",
        "Circular distribution"
      ],
      "answer": "Normal distribution",
      "explanation": "A normal distribution is represented by a bell-shaped curve."
    },
    {
      "question": "Experimental probability is obtained from:",
      "options": [
        "Formula only",
        "Actual experiment",
        "Guesswork",
        "Graphs only"
      ],
      "answer": "Actual experiment",
      "explanation": "Experimental probability is calculated using the outcomes of actual experiments."
    },
    {
      "question": "Which chapter involves dividing a line segment using similar triangles?",
      "options": [
        "Circles",
        "Constructions",
        "Probability",
        "Coordinate Geometry"
      ],
      "answer": "Constructions",
      "explanation": "The Constructions chapter uses similar triangles to divide a line segment in a given ratio."
    },
    {
      "question": "Which of the following is used to understand theoretical probability?",
      "options": [
        "Clinometer",
        "Spinner",
        "Algebra tiles",
        "Geoboard"
      ],
      "answer": "Spinner",
      "explanation": "A spinner is commonly used to demonstrate and understand theoretical probability."
    },
    {
      "question": "Which method helps visualize the factorization of a quadratic polynomial?",
      "options": [
        "Probability tree",
        "Algebra tiles",
        "Compass construction",
        "Spinner"
      ],
      "answer": "Algebra tiles",
      "explanation": "Algebra tiles provide a visual way to understand the factorization of quadratic polynomials."
    },
    {
      "question": "While completing the square, dividing the x-tiles into two equal groups represents:",
      "options": [
        "Multiplying the coefficient of x by 2",
        "Dividing the coefficient of x by 2",
        "Squaring the constant term",
        "Finding the discriminant"
      ],
      "answer": "Dividing the coefficient of x by 2",
      "explanation": "Dividing the x-tiles into two groups represents halving the coefficient of x to complete the square."
    },
    {
      "question": "Magnetic tiles arranged in a triangular pattern help derive:",
      "options": [
        "Area of a circle",
        "Sum of the first n natural numbers",
        "Distance formula",
        "Trigonometric ratios"
      ],
      "answer": "Sum of the first n natural numbers",
      "explanation": "Arranging magnetic tiles in a triangle helps visualize the formula for the sum of the first n natural numbers."
    },
    {
      "question": "The activity using magnetic tiles to represent even numbers shows the sum of the first n even integers is:",
      "options": [
        "n²",
        "n(n + 1)",
        "n(n – 1)",
        "2n"
      ],
      "answer": "n(n + 1)",
      "explanation": "The sum of the first n even numbers is given by the formula n(n + 1)."
    },
    {
      "question": "The pattern formed by the sum of consecutive odd numbers is:",
      "options": [
        "Rectangle",
        "Triangle",
        "Perfect square",
        "Circle"
      ],
      "answer": "Perfect square",
      "explanation": "Adding consecutive odd numbers forms perfect square numbers."
    },
    {
      "question": "The theorem involving a line parallel to one side of a triangle is based on:",
      "options": [
        "Congruence",
        "Similarity",
        "Pythagoras theorem",
        "Circle theorem"
      ],
      "answer": "Similarity",
      "explanation": "The Basic Proportionality Theorem is based on the similarity of triangles."
    },
    {
      "question": "The distance formula was derived in the activity using:",
      "options": [
        "Clinometer and ruler",
        "Graph paper only",
        "Geoboard and rubber bands",
        "Compass and divider"
      ],
      "answer": "Geoboard and rubber bands",
      "explanation": "A geoboard with rubber bands helps students visualize the derivation of the distance formula."
    },
    {
      "question": "Which pair of trigonometric ratios are complementary?",
      "options": [
        "Sin θ and Tan θ",
        "Cos θ and Sec θ",
        "Sin θ and Cos (90° – θ)",
        "Tan θ and Cot θ"
      ],
      "answer": "Sin θ and Cos (90° – θ)",
      "explanation": "The identity sin θ = cos (90° − θ) holds for complementary angles."
    },
    {
      "question": "Practical values of sin, cos and tan were found for:",
      "options": [
        "Random angles",
        "Standard angles",
        "Reflex angles",
        "Obtuse angles only"
      ],
      "answer": "Standard angles",
      "explanation": "Standard angles such as 0°, 30°, 45°, 60°, and 90° are commonly used to determine trigonometric values."
    },
    {
      "question": "A clinometer is mainly used in:",
      "options": [
        "Probability",
        "Coordinate Geometry",
        "Applications of Trigonometry",
        "Circles"
      ],
      "answer": "Applications of Trigonometry",
      "explanation": "A clinometer is used in trigonometry to measure angles for finding heights and distances."
    },
    {
      "question": "If the angle of elevation is 45°, the distance from the object is:",
      "options": [
        "Greater than the height",
        "Less than the height",
        "Equal to the height",
        "Zero"
      ],
      "answer": "Equal to the height",
      "explanation": "Since tan 45° = 1, the horizontal distance is equal to the object's height."
    },
    {
      "question": "Rearranging sectors of a circle into a parallelogram helps derive:",
      "options": [
        "Circumference of a circle",
        "Area of a circle",
        "Diameter of a circle",
        "Arc length"
      ],
      "answer": "Area of a circle",
      "explanation": "Rearranging the sectors forms a parallelogram that helps derive the area formula of a circle."
    },
    {
      "question": "The height of the parallelogram formed from a circle is equal to the:",
      "options": [
        "Circumference",
        "Diameter",
        "Radius",
        "Chord"
      ],
      "answer": "Radius",
      "explanation": "The height of the rearranged parallelogram is the radius of the circle."
    },
    {
      "question": "Experimental probability is usually closest to theoretical probability when:",
      "options": [
        "Very few trials are conducted",
        "Only one trial is conducted",
        "A large number of trials are conducted",
        "No experiment is performed"
      ],
      "answer": "A large number of trials are conducted",
      "explanation": "Increasing the number of trials makes experimental probability approach theoretical probability."
    },
    {
      "question": "Which distribution has most observations near the centre?",
      "options": [
        "Uniform distribution",
        "Normal distribution",
        "Random distribution",
        "Circular distribution"
      ],
      "answer": "Normal distribution",
      "explanation": "In a normal distribution, most observations are concentrated around the centre."
    },
    {
      "question": "Experimental probability is calculated using:",
      "options": [
        "Actual outcomes",
        "Formula only",
        "Assumptions",
        "Guesswork"
      ],
      "answer": "Actual outcomes",
      "explanation": "Experimental probability is determined from the outcomes observed in real experiments."
    },
    {
      "question": "Which chapter explains dividing a line segment using similar triangles?",
      "options": [
        "Triangles",
        "Probability",
        "Constructions",
        "Circles"
      ],
      "answer": "Constructions",
      "explanation": "The Constructions chapter uses similar triangles to divide a line segment in a given ratio."
    },
    {
      "question": "Which chapter uses a spinner to compare experimental and theoretical probability?",
      "options": [
        "Coordinate Geometry",
        "Probability",
        "Quadratic Equations",
        "Trigonometry"
      ],
      "answer": "Probability",
      "explanation": "The Probability chapter uses spinners to compare theoretical and experimental probabilities."
    },
    {
      "question": "Which activity helps students understand why n² is the sum of the first n odd numbers?",
      "options": [
        "Using a clinometer",
        "Arranging magnetic tiles",
        "Measuring distances",
        "Drawing circles"
      ],
      "answer": "Arranging magnetic tiles",
      "explanation": "Magnetic tiles visually show that the sum of consecutive odd numbers forms perfect squares."
    },
    {
      "question": "The activities in the Probability chapter demonstrate that:",
      "options": [
        "Experimental probability is always equal to theoretical probability.",
        "Experimental probability never changes.",
        "More trials make experimental probability approach theoretical probability.",
        "Theoretical probability depends on luck."
      ],
      "answer": "More trials make experimental probability approach theoretical probability.",
      "explanation": "According to the Law of Large Numbers, increasing the number of trials makes experimental probability closer to theoretical probability."
    },
    {
      "question": "Algebra tiles help students understand quadratic equations by:",
      "options": [
        "Measuring angles",
        "Visualizing factors and roots",
        "Finding probability",
        "Drawing circles"
      ],
      "answer": "Visualizing factors and roots",
      "explanation": "Algebra tiles visually represent quadratic expressions, helping students understand their factors and roots."
    },
    {
      "question": "Completing the square with algebra tiles helps students:",
      "options": [
        "Find the circumference of a circle",
        "Visualize the square formation",
        "Measure distances",
        "Calculate probability"
      ],
      "answer": "Visualize the square formation",
      "explanation": "Algebra tiles make it easier to see how a perfect square is formed while completing the square."
    },
    {
      "question": "The formula n(n + 1)/2 gives the sum of:",
      "options": [
        "First n odd numbers",
        "First n even numbers",
        "First n natural numbers",
        "Squares of natural numbers"
      ],
      "answer": "First n natural numbers",
      "explanation": "The formula n(n + 1)/2 is used to find the sum of the first n natural numbers."
    },
    {
      "question": "Magnetic tiles arranged in a triangular pattern are used to understand:",
      "options": [
        "Coordinate Geometry",
        "Arithmetic Progression",
        "Circles",
        "Probability"
      ],
      "answer": "Arithmetic Progression",
      "explanation": "The triangular arrangement of magnetic tiles helps visualize the pattern of an arithmetic progression."
    },
    {
      "question": "The sum of the first five odd numbers is:",
      "options": [
        "20",
        "25",
        "15",
        "10"
      ],
      "answer": "25",
      "explanation": "The first five odd numbers (1 + 3 + 5 + 7 + 9) add up to 25."
    },
    {
      "question": "A line drawn parallel to one side of a triangle divides the other two sides:",
      "options": [
        "Equally",
        "In equal proportion",
        "Perpendicularly",
        "Randomly"
      ],
      "answer": "In equal proportion",
      "explanation": "The Basic Proportionality Theorem states that such a line divides the other two sides proportionally."
    },
    {
      "question": "Rubber bands are used with a geoboard to derive:",
      "options": [
        "Area of a circle",
        "Distance formula",
        "Trigonometric identities",
        "Probability"
      ],
      "answer": "Distance formula",
      "explanation": "A geoboard with rubber bands helps visualize the derivation of the distance formula."
    },
    {
      "question": "The cosine of an angle is equal to the sine of its:",
      "options": [
        "Double angle",
        "Complementary angle",
        "Supplementary angle",
        "Reflex angle"
      ],
      "answer": "Complementary angle",
      "explanation": "The identity cos θ = sin (90° − θ) relates complementary angles."
    },
    {
      "question": "Which trigonometric ratio is equal to cos(90° − θ)?",
      "options": [
        "tan θ",
        "sec θ",
        "sin θ",
        "cot θ"
      ],
      "answer": "sin θ",
      "explanation": "The complementary angle identity states that cos(90° − θ) = sin θ."
    },
    {
      "question": "The activity using a clinometer demonstrates:",
      "options": [
        "Circle construction",
        "Measurement of heights",
        "Experimental probability",
        "Distance formula"
      ],
      "answer": "Measurement of heights",
      "explanation": "A clinometer measures angles of elevation to calculate the height of objects."
    },
    {
      "question": "When the angle of elevation is 45°, the object's height is:",
      "options": [
        "Less than the distance",
        "Equal to the distance",
        "Greater than the distance",
        "Zero"
      ],
      "answer": "Equal to the distance",
      "explanation": "Since tan 45° = 1, the height and horizontal distance are equal."
    },
    {
      "question": "Rearranging sectors of a circle into a parallelogram helps prove:",
      "options": [
        "Circumference formula",
        "Area formula",
        "Arc length formula",
        "Diameter formula"
      ],
      "answer": "Area formula",
      "explanation": "Rearranging the sectors forms a parallelogram that helps derive the area formula of a circle."
    },
    {
      "question": "The area of a circle is obtained by multiplying:",
      "options": [
        "Radius × Diameter",
        "π × Radius²",
        "π × Diameter",
        "2πr²"
      ],
      "answer": "π × Radius²",
      "explanation": "The area of a circle is calculated using the formula πr²."
    },
    {
      "question": "Which statement about experimental probability is correct?",
      "options": [
        "It is always exactly equal to theoretical probability.",
        "It depends on actual observations.",
        "It is always zero.",
        "It never changes."
      ],
      "answer": "It depends on actual observations.",
      "explanation": "Experimental probability is calculated from the outcomes observed in actual experiments."
    },
    {
      "question": "Which graph is commonly associated with a normal distribution?",
      "options": [
        "Straight line",
        "Bell-shaped curve",
        "Triangle",
        "Rectangle"
      ],
      "answer": "Bell-shaped curve",
      "explanation": "A normal distribution is represented by a bell-shaped curve."
    },
    {
      "question": "According to the Law of Large Numbers, increasing the number of trials:",
      "options": [
        "Makes results more random.",
        "Brings experimental probability closer to theoretical probability.",
        "Reduces theoretical probability.",
        "Makes probability equal to zero."
      ],
      "answer": "Brings experimental probability closer to theoretical probability.",
      "explanation": "As the number of trials increases, experimental probability approaches theoretical probability."
    },
    {
      "question": "In probability activities, outcomes are classified into categories such as:",
      "options": [
        "Positive and negative",
        "Even and odd",
        "Acute and obtuse",
        "Large and small"
      ],
      "answer": "Even and odd",
      "explanation": "Outcomes are often grouped into categories like even and odd to calculate probabilities."
    },
    {
      "question": "The Construction chapter mainly explains:",
      "options": [
        "Drawing a tangent",
        "Dividing a line segment using similar triangles",
        "Constructing a histogram",
        "Drawing a parabola"
      ],
      "answer": "Dividing a line segment using similar triangles",
      "explanation": "The Constructions chapter uses similar triangles to divide a line segment in a given ratio."
    },
    {
      "question": "Which chapter uses standard angles to find practical values of trigonometric ratios?",
      "options": [
        "Coordinate Geometry",
        "Introduction to Trigonometry",
        "Circles",
        "Probability"
      ],
      "answer": "Introduction to Trigonometry",
      "explanation": "The Introduction to Trigonometry chapter teaches the trigonometric ratios of standard angles."
    },
    {
      "question": "Which chapter emphasizes comparing theoretical probability with actual experimental results?",
      "options": [
        "Arithmetic Progression",
        "Triangles",
        "Probability",
        "Circles"
      ],
      "answer": "Probability",
      "explanation": "The Probability chapter compares experimental results with theoretical probability to understand chance."
    },
    {
      "question": "In the activity on quadratic equations, arranging algebra tiles into a rectangle helps students:",
      "options": [
        "Measure area",
        "Find the factors of a polynomial",
        "Calculate probability",
        "Draw a graph"
      ],
      "answer": "Find the factors of a polynomial",
      "explanation": "Arranging algebra tiles into a rectangle helps visualize the factorization of a quadratic polynomial."
    },
    {
      "question": "Which formula was learned using magnetic tiles arranged in a triangular pattern?",
      "options": [
        "Area of a circle",
        "Sum of the first n natural numbers",
        "Distance formula",
        "Pythagoras theorem"
      ],
      "answer": "Sum of the first n natural numbers",
      "explanation": "The triangular arrangement of magnetic tiles demonstrates the formula for the sum of the first n natural numbers."
    },
    {
      "question": "The activity with magnetic tiles shows that the sum of the first n odd numbers forms a:",
      "options": [
        "Triangle",
        "Rectangle",
        "Perfect square",
        "Circle"
      ],
      "answer": "Perfect square",
      "explanation": "Adding the first n odd numbers always forms a perfect square, n²."
    },
    {
      "question": "The theorem stating that a line parallel to one side of a triangle divides the other two sides in equal proportion belongs to:",
      "options": [
        "Probability",
        "Triangles",
        "Circles",
        "Coordinate Geometry"
      ],
      "answer": "Triangles",
      "explanation": "This is the Basic Proportionality Theorem, which is studied in the Triangles chapter."
    },
    {
      "question": "Which tool was specifically used to derive the distance formula?",
      "options": [
        "Compass",
        "Geoboard",
        "Protractor",
        "Clinometer"
      ],
      "answer": "Geoboard",
      "explanation": "A geoboard helps students visualize and derive the distance formula."
    },
    {
      "question": "Which trigonometric identity was demonstrated in the activity?",
      "options": [
        "tan θ = cot θ",
        "sin θ = cos (90° − θ)",
        "sec θ = cosec θ",
        "tan θ = sin θ"
      ],
      "answer": "sin θ = cos (90° − θ)",
      "explanation": "This complementary angle identity shows that sin θ equals cos (90° − θ)."
    },
    {
      "question": "Which instrument is useful for measuring the height of a building using trigonometry?",
      "options": [
        "Divider",
        "Clinometer",
        "Compass",
        "Scale"
      ],
      "answer": "Clinometer",
      "explanation": "A clinometer measures the angle of elevation to calculate the height of an object."
    },
    {
      "question": "While deriving the area of a circle, the base of the formed parallelogram is equal to:",
      "options": [
        "Radius",
        "Diameter",
        "Half of the circumference",
        "Quarter of the circumference"
      ],
      "answer": "Half of the circumference",
      "explanation": "Rearranging the sectors forms a parallelogram whose base equals half the circumference of the circle."
    },
    {
      "question": "According to the Law of Large Numbers, increasing the number of experiments will:",
      "options": [
        "Decrease theoretical probability",
        "Make experimental probability approach theoretical probability",
        "Make all outcomes equally likely",
        "Eliminate random variation"
      ],
      "answer": "Make experimental probability approach theoretical probability",
      "explanation": "More experiments make the experimental probability closer to the theoretical probability."
    },
    {
      "question": "The Construction chapter explains how to:",
      "options": [
        "Construct tangents to a circle",
        "Divide a line segment using similar triangles",
        "Draw concentric circles",
        "Construct histograms"
      ],
      "answer": "Divide a line segment using similar triangles",
      "explanation": "The Constructions chapter explains how to divide a line segment in a given ratio using similar triangles."
    }
  ]
}

const classSubjectMap = {
  'class8-science': { className: 'Class 8', subject: 'Science' },
  'class8-math': { className: 'Class 8', subject: 'Mathematics' },
  'class9-science': { className: 'Class 9', subject: 'Science' },
  'class9-math': { className: 'Class 9', subject: 'Mathematics' },
  'class10-science': { className: 'Class 10', subject: 'Science' },
  'class10-math': { className: 'Class 10', subject: 'Mathematics' }
}

async function uploadAll() {
  for (const [quizId, questions] of Object.entries(questionBank)) {
    const meta = classSubjectMap[quizId]
    await setDoc(doc(db, 'quizzes', quizId), {
      className: meta.className,
      subject: meta.subject,
      questions: questions
    })
    console.log(`Uploaded ${quizId}: ${questions.length} questions`)
  }
  console.log('\nAll quizzes uploaded successfully!')
  process.exit(0)
}

uploadAll().catch(err => {
  console.error('Upload failed:', err)
  process.exit(1)
})
