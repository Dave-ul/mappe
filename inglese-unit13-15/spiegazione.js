// Spiegazione completa di Unit 13 (Sensing Technologies) e Unit 15 (The Automotive Industry and the Environment)
// di Electronics - Skills and Competences, scritta con parole proprie (niente frasi copiate dal libro).
// Appunti Saber usati: 26-10-02 (schema del sensore fotoelettrico) e 26-10-07 (pro e contro delle auto elettriche).

module.exports = {
  titolo: "Inglese · Unit 13 e 15",
  blocchi: [
    { t: "titolo", testo: "Electronics · Unit 13 and Unit 15, fully explained",
      sotto: "testo in inglese semplice, parole chiave con la traduzione · bordo spesso = da sapere" },

    // ---------------- UNIT 13 ----------------
    { t: "sez", testo: "Unit 13 · Sensing Technologies" },

    { t: "sez", testo: "1 · Sensor, detector, transducer" },
    { t: "due", sx: [
      { t: "p", testo: "A <b>sensor</b> (sensore) is a device that reacts to a physical quantity, like heat or light, and gives an output that depends on it, usually an <b>electrical or optical signal</b>. The verb is <i>to sense</i> = to feel, to notice." },
      { t: "p", testo: "A <b>detector</b> (rilevatore) is mostly used with <b>radio waves</b>: it picks up the useful information carried by a modulated wave. The verb is <i>to detect</i> = to find, to discover. A <i>detective</i> is a person, not a device!" },
    ], dx: [
      { t: "p", testo: "A <b>transducer</b> (trasduttore) changes one kind of energy into another. In a control system it <b>monitors the output</b> and sends back the feedback signal." },
      { t: "p", testo: "A <b>relay</b> (relè) is a switch moved by electricity: a small, low-power signal controls a separate circuit." },
      { t: "p", testo: "An <b>actuator</b> (attuatore) does the opposite of a sensor: it turns a signal into <b>action or motion</b> (motors, valves)." },
    ] },

    { t: "sez", testo: "2 · Why sensors matter" },
    { t: "due", sx: [
      { t: "p", testo: "Sensor technology is a <b>key technology</b> today. It is used in many fields: <b>environment, medicine, commerce, security, industry</b>." },
      { t: "p", testo: "Industry likes sensors because they give <b>more control over processes</b>, so products are <b>better and made more efficiently</b>. Sensors also help in medical diagnostics, in power plants and in people's safety." },
    ], dx: [
      { t: "p", testo: "The future: <b>intelligent systems</b> that check themselves (<i>self-monitoring</i>), fix themselves (<i>self-correcting</i>) and change themselves (<i>self-modifying</i>)." },
      { t: "tab", intest: ["a system can…", "thanks to"], righe: [
        ["see", "photonic technology"], ["feel", "physical measurements"], ["smell", "electronic noses"],
        ["hear", "ultrasonics"], ["think, communicate", "smart electronics, wireless"], ["move", "sensors + actuators"],
      ] },
    ] },

    { t: "sez", testo: "3 · Mechatronics" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: ["<b>mechatronics</b> = mechanics + electronics + computer science", "the word was created in <b>1969</b> by the Japanese engineer <b>Tetsuro Mori</b>"] },
      { t: "p", testo: "It is the branch of engineering that designs, builds and maintains products with <b>both mechanical and electronic parts</b>. Today it also includes computer engineering, industrial automation and robotics. <b>Sensors are its key technology.</b>" },
    ], dx: [
      { t: "p", testo: "<b>The car is the best example</b>: a modern car has <b>25 to 50 CPUs</b> controlling mechanical functions." },
      { t: "p", testo: "• <b>ABS</b> (anti-lock braking system, freni antibloccaggio): when sensors notice that a wheel is locking, the electronics takes control of the brakes.<br>• <b>Tyre pressure monitoring</b>: a sensor in each tyre sends data; if the pressure is low, the software lights up an icon on the <b>dashboard</b> (cruscotto)." },
      { t: "p", testo: "A mechatronic control system is a <b>closed loop with feedback</b>: system to control (e.g. a motor), actuator (power electronics), controller." },
    ] },

    { t: "sez", testo: "4 · PLC" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: ["<b>PLC</b> = Programmable Logic Controller (controllore a logica programmabile)", "invented in the <b>late 1960s</b> by <b>Richard Morley</b>"] },
      { t: "p", testo: "<b>What it replaced:</b> old <b>relay logic</b> systems. Relays often broke and caused delays, and technicians had to check a whole wall of relays to find the fault." },
      { t: "p", testo: "<b>What it is:</b> a small, tough industrial computer. It reads inputs, takes <b>logic decisions</b> and controls outputs in automated machines and processes." },
      { t: "p", testo: "<b>Advantages:</b> robust (it works with heat, cold, dust, <i>moisture</i> = umidità), easy to program, today one of the most used controllers in industry. <b>Disadvantage</b> of the first PLCs: bad with complex data." },
    ], dx: [
      { t: "tab", intest: ["inputs", "outputs"], righe: [
        ["keyboards, switches", "motors"], ["sensors: light, temperature, sound, position, liquid level", "lights, buzzers (cicalini)"],
        ["robots, visual systems", "solenoid valves (valvole solenoidi)"],
      ] },
      { t: "p", testo: "Inputs can be <b>digital or analogue</b>." },
      { t: "box", titolo: "Hardware", righe: [
        "<b>CPU</b> = the brain: 16 or 32-bit microprocessor; executes instructions, communicates, does logic and maths, runs self-diagnostics",
        "<b>ROM</b>: keeps the operating system permanently",
        "<b>RAM</b>: input/output status, timers, counters",
        "a <b>programming device</b> (computer or console) loads the program",
      ] },
    ] },

    { t: "sez", testo: "5 · Control systems and smart sensors" },
    { t: "due", sx: [
      { t: "p", testo: "<b>Open-loop control</b>: no feedback. Example: a <b>light dimmer</b>. You turn the <i>knob</i> (manopola) to choose the light level; if the room gets darker, nothing changes automatically. Only a person can correct it." },
      { t: "p", testo: "<b>Closed-loop control</b>: a <b>transducer</b> measures the real output and the system corrects it automatically." },
      { t: "tab", intest: ["transducer", "controls"], righe: [
        ["thermistor (termistore)", "temperature"], ["resistor, potentiometer", "position"], ["strain gauge (estensimetro)", "force"],
      ] },
    ], dx: [
      { t: "p", testo: "<b>Smart sensors</b> are a new generation of sensors and they are essential for the <b>IoT</b> and the <b>IIoT</b> (Industrial Internet of Things). RFID tags are an example." },
      { t: "box", tipo: "memo", titolo: "Smart sensors do three things", righe: ["<b>identify</b> items · <b>locate</b> them · check their <b>environmental conditions</b>"] },
      { t: "p", testo: "In factories and warehouses they record temperature and humidity, save data for quality control, and start alarms. They produce a lot of <b>big data</b>." },
    ] },

    { t: "sez", testo: "6 · The photoelectric sensor" },
    { t: "due", sx: [
      { t: "p", testo: "Used in <b>factory automation</b>. Two main parts:" },
      { t: "p", testo: "• <b>emitter</b>: a light source (<b>LED or laser</b>), switched on and off very fast (<i>pulse-modulated</i>) by an oscillator;<br>• <b>receiver</b>: a <b>photodiode or phototransistor</b> that turns the light it receives into a voltage." },
      { t: "p", testo: "The voltage is <b>amplified</b> and <b>demodulated</b>. The receiver is <i>tuned</i> (sintonizzato) to the emitter's pulse frequency, so it <b>ignores normal ambient light</b>. When the light goes above or below a set level, it gives an output signal." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Block diagram (appunti 2/10)", righe: [
        "pulse generator → LED emitter → light hits the <b>object</b>",
        "→ receiver → <b>amplifier</b> (with <i>sensitivity adjustment</i>)",
        "→ <b>sync detector</b> → <b>level sensor</b> → <b>output</b>",
        "a <b>voltage regulator</b> feeds the blocks",
      ] },
    ] },

    { t: "sez", testo: "7 · Industrial electronics and the controls engineer" },
    { t: "due", sx: [
      { t: "p", testo: "<b>Industrial electronics</b> is the branch of electronics that <b>automates industrial processes</b>, electrical and mechanical: control systems, instruments, signal processing." },
      { t: "p", testo: "It goes from simple <b>fuses</b> to <b>PLCs</b>, solid-state devices, <b>motor drives</b> and robots. You find it in labs, car plants, power plants, building sites, chemical plants, refineries, mines and chip factories." },
    ], dx: [
      { t: "p", testo: "<b>Job: Automation Controls Engineer</b> (Tesla Gigafactory, Nevada). Main skills:" },
      { t: "p", testo: "• program PLCs, safety devices, <b>HMI</b> (Human Machine Interface), servo drives, robots;<br>• follow the system from power-on to <b>debug</b> and final tuning;<br>• work with design, quality, production and maintenance teams;<br>• draw electrical schematics in <b>CAD</b>, design <i>fault-tolerant</i> systems, pick and place automation." },
    ] },

    // ---------------- UNIT 15 ----------------
    { t: "sez", testo: "Unit 15 · The Automotive Industry and the Environment" },

    { t: "sez", testo: "8 · The car engine" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Four strokes (4 fasi)", righe: ["intake (aspirazione) → compression → combustion → exhaust (scarico)"] },
    ], dx: [
      { t: "tab", intest: ["part", "parte"], righe: [
        ["intake / exhaust valve", "valvola di aspirazione / scarico"], ["spark plug", "candela"],
        ["piston · cylinder", "pistone · cilindro"], ["oil sump", "coppa dell'olio"], ["braking system", "sistema frenante"],
      ] },
    ] },

    { t: "sez", testo: "9 · Electric vehicles" },
    { t: "due", sx: [
      { t: "p", testo: "<b>BEV</b> = battery electric vehicle: the energy is stored in a <b>battery pack</b> that powers an electric motor. It does not use petrol or diesel, so it is called <b>all-electric</b>. It is recharged from the <b>grid</b> (rete): a wall socket or a charging unit." },
      { t: "box", tipo: "passi", titolo: "What changes compared to a petrol car", righe: [
        "the petrol engine → an <b>electric motor</b>",
        "the motor takes power from a <b>controller</b>",
        "the controller takes power from <b>rechargeable batteries</b>",
      ] },
      { t: "p", testo: "Range: from about 60 to over 200 miles with one charge. A car with solar panels is a <b>solar car</b>; one with a petrol generator is a kind of <b>hybrid</b>." },
    ], dx: [
      { t: "p", testo: "<b>Environment</b>: electric cars are <b>quieter</b> and have <b>zero tailpipe emissions</b> (AE <i>tailpipe</i> = BE <i>exhaust</i>, gas di scarico). But the electricity may be produced by burning fossil fuels, so pollution moves to the <b>power station</b>. Even so, they pollute less than petrol cars; with <b>wind or solar</b> energy they are almost emission-free." },
      { t: "p", testo: "<b>Since 2008</b> electric cars have come back, because batteries improved, oil became expensive and people want to reduce greenhouse gases." },
      { t: "tab", intest: ["pros", "cons"], righe: [
        ["environmentally friendly", "high cost"], ["no noise", "limited range"],
        ["lower maintenance", "risk of not finding a charger"],
      ] },
    ] },

    { t: "sez", testo: "10 · Hybrid cars" },
    { t: "due", sx: [
      { t: "p", testo: "A <b>hybrid</b> combines a normal combustion engine, an electric motor and a battery: it uses <b>less fuel</b> and makes <b>fewer emissions</b>." },
      { t: "p", testo: "• <b>Plug-in hybrid</b>: you can plug it in; short trips on the battery only, then the petrol engine <i>kicks in</i> (si attiva) on longer trips.<br>• <b>Conventional hybrid</b>: you can't plug it in, so it is not an EV; the electric motor <i>boosts</i> the engine and the battery recharges <b>while braking and slowing down</b>." },
    ], dx: [
      { t: "p", testo: "<b>Powertrain</b> (gruppo di propulsione): using the stored energy well is now a big advantage for car makers. New cars have <b>DC-DC converters</b> for the different subsystems and recover the <b>kinetic energy of braking</b>, to travel further before recharging." },
    ] },

    { t: "sez", testo: "11 · Batteries" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: ["chemical energy → electricity → electric motor → mechanical energy → wheels", "same principle as <b>Volta's battery</b>"] },
      { t: "p", testo: "A good battery depends on: <b>safety, life span, performance, specific energy, specific power, cost</b>." },
      { t: "p", testo: "• <b>specific energy</b> = energy stored per kg<br>• <b>specific power</b> = power given per kg<br>• <b>life span</b> = charge-discharge cycles + age" },
      { t: "p", testo: "Lead-acid batteries are <b>obsolete</b>, liquid batteries are still being tested, <b>lithium-ion</b> and <b>lithium polymer</b> are the standard." },
    ], dx: [
      { t: "tab", intest: ["lithium-ion: pros", "lithium-ion: cons"], righe: [
        ["high specific energy", "short life span (about 5 years)"],
        ["good efficiency: saves space and weight", "highly flammable"],
        ["good charging time", "works well only from −10 to +30 °C"],
      ] },
      { t: "p", testo: "<b>Charging problems</b>: the goal is 500 km with one charge and recharging in seconds. The grid connection limits charging time, and <b>charging spots</b> are not everywhere. Building them is expensive and often paid by local governments." },
    ] },

    { t: "sez", testo: "12 · Electronics in cars: ECU and sensors" },
    { t: "due", sx: [
      { t: "p", testo: "A car today is about <b>80% electronics</b>, and parts get smaller and smaller (<i>miniaturization</i>)." },
      { t: "p", testo: "<b>History</b>: semiconductors after World War II → solid-state diodes and transistor ignition in the <b>1960s</b> → microprocessors in the <b>1970s</b>." },
      { t: "box", tipo: "memo", titolo: "ECU", righe: [
        "first: <b>engine</b> control unit → now: any <b>electronic</b> control unit",
        "40–100 ECUs in a car; each is an embedded digital computer",
        "20–50 <b>sensors</b> → ECU → 20–30 <b>actuators</b>",
      ] },
      { t: "p", testo: "It controls fuel ignition, emissions, cooling, the throttle (valvola a farfalla), the fuel injectors." },
    ], dx: [
      { t: "tab", intest: ["sensor type", "examples"], righe: [
        ["engine", "oxygen, throttle position, crank position, coolant temperature, air flow"],
        ["speed", "wheel speed, speedometer (tachimetro), piezoelectric"],
        ["lidar", "3-D maps for autonomous cars"],
        ["vehicle", "parking, air conditioning, rain, oil, fuel gauge"],
      ] },
      { t: "p", testo: "<b>Actuator</b>: produces action or motion; it can be <b>pneumatic, hydraulic or electrical</b>." },
    ] },

    { t: "sez", testo: "13 · Lidar and self-driving cars" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: ["<b>LIDAR</b> = <b>Li</b>ght <b>D</b>etection <b>a</b>nd <b>R</b>anging", "laser pulses hit objects → reflected pulses → distance → <b>3-D map</b>"] },
      { t: "p", testo: "The best lidars see details of a few centimetres more than 100 metres away. Most companies think they are <b>essential for self-driving (autonomous) cars</b>." },
    ], dx: [
      { t: "p", testo: "<b>Problems</b>: lidars are <b>bulky</b> (test cars have a big black dome on the roof) and <b>very expensive</b>. Until now they were a <b>niche</b> product, for drones, satellites, robots and UAVs (unmanned aerial vehicles)." },
      { t: "p", testo: "<b>Solution</b>: new <b>solid-state</b> lidars, cheaper, smaller and stronger. The future of autonomous cars depends on them." },
    ] },

    { t: "sez", testo: "14 · Sensors for energy efficiency" },
    { t: "due", sx: [
      { t: "p", testo: "Sensors reduce energy <i>consumption</i> (consumo) in homes, offices and cars, and so help against <b>climate change</b>. <b>Transport</b> is the only sector where greenhouse gas emissions are still higher than in 1990." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "The air-conditioning sensor", righe: [
        "it measures <b>temperature and humidity</b> inside the car",
        "the ventilation stops the <b>windscreen</b> (parabrezza) from <i>fogging up</i> (appannarsi)",
        "when there is no more risk of condensation → air-con <b>switches off</b> → less energy",
      ] },
    ] },

    // ---------------- DOMANDE ----------------
    { t: "sez", testo: "15 · Questions the teacher can ask" },
    { t: "tab", intest: ["question", "see"], larghezze: ["70%", "30%"], righe: [
      ["What is a sensor? What is the difference between a sensor and a detector?", "§1"],
      ["What is mechatronics? Give an example in a car.", "§3"],
      ["What is a PLC? Who invented it, what did it replace and why?", "§4"],
      ["Describe the hardware of a PLC.", "§4"],
      ["What is the difference between open-loop and closed-loop control?", "§5"],
      ["What is a smart sensor and what is it used for?", "§5"],
      ["How does a photoelectric sensor work?", "§6"],
      ["What is industrial electronics? Where is it used?", "§7"],
      ["Name the four strokes of an engine.", "§8"],
      ["What is a BEV? How is it different from a petrol car?", "§9"],
      ["Are electric cars really clean? Pros and cons.", "§9"],
      ["What is a hybrid car? What types are there?", "§10"],
      ["Pros and cons of lithium-ion batteries. What are specific energy and specific power?", "§11"],
      ["What is an ECU? What does it control?", "§12"],
      ["What does lidar stand for? What are its problems?", "§13"],
      ["How can a sensor save energy in a car?", "§14"],
    ] },
    { t: "box", tipo: "passi", titolo: "Useful phrases for speaking", righe: [
      "<i>It is a device that…</i> · <i>It is used to…</i> · <i>It consists of…</i>",
      "<i>The main advantage is…, but on the other hand…</i>",
      "<i>For example, in a car…</i> · <i>This means that…</i> · <i>Compared to…</i>",
    ] },

    { t: "sez", testo: "16 · Correzioni agli appunti" },
    { t: "p", testo: "• 2/10: <i>sensitively adjustement</i> → <b>sensitivity adjustment</b>.<br>• 7/10: <i>environmental friendly</i> → <b>environmentally friendly</b>; <i>high qst</i> → <b>high cost</b>; <i>easy refueling</i> non torna con il libro, che dice che i punti di ricarica non sono ovunque e che ricaricare richiede tempo: meglio non dirlo." },
  ],
};
