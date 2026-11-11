// Mappa di inglese tecnico (Electronics - Skills and Competences): Unit 13 Sensing Technologies e
// Unit 15 The Automotive Industry and the Environment. 1 foglio A4 fronte-retro, da ricopiare a mano.
// Criteri della skill mappe-studio: parole chiave e collegamenti, niente frasi pronte, riassunti o rimandi al testo.
// Formato dei riquadri: vedi integrali/contenuto_mappa.js.

const facciate = [
  {
    titolo: "Unit 13 · Sensing Technologies",
    sezioni: [
      {
        titolo: "Words",
        box: [
          {
            mem: true, h: "Key terms", w: 6,
            intest: ["EN", "IT · meaning"], gruppi: 2,
            tab: [
              ["sensor", "sensore · input → electric signal"],
              ["detector", "rilevatore · radio waves"],
              ["transducer", "trasduttore · feedback"],
              ["relay", "relè · switch, low-power signal"],
              ["actuator", "attuatore · motion"],
              ["thermistor", "termistore → temperature"],
              ["potentiometer", "potenziometro → position"],
              ["strain gauge", "estensimetro → force"],
              ["buzzer", "cicalino"],
              ["solenoid valve", "valvola solenoide"],
            ],
          },
        ],
      },
      {
        titolo: "Ideas",
        box: [
          {
            mem: true, h: "Mechatronics", w: 3,
            b: [
              "mechanics + electronics + computer science",
              "1969, Tetsuro Mori",
              "car: 25–50 CPUs",
              "ABS: wheels lock up → electronic braking",
              "tyre sensors → dashboard icon",
            ],
          },
          {
            mem: true, h: "Sensors can…", w: 3,
            tab: [
              ["see", "photonics"],
              ["smell", "electronic noses"],
              ["hear", "ultrasonics"],
              ["think", "smart electronics, wireless"],
              ["move", "+ actuators"],
            ],
          },
          {
            mem: true, h: "Control systems", w: 6,
            albero: {
              t: "control system",
              f: [
                { t: "open-loop → dimmer, knob, no feedback" },
                { t: "closed-loop → transducer monitors output → feedback" },
              ],
            },
          },
          {
            mem: true, h: "PLC · Programmable Logic Controller", w: 6, da: "relay",
            b: [
              "late 1960s, Richard Morley · replaces relay logic (failures, delays)",
              "robust: heat, cold, dust, moisture · easy to program",
            ],
            flow: ["inputs: switches, sensors", "CPU = brain", "outputs: motors, buzzers, valves"],
            dopo: ["ROM = operating system · RAM = I/O status, timers, counters"],
          },
          {
            mem: true, h: "Smart sensors", w: 3, da: "IoT, IIoT",
            b: [
              "RFID tags",
              "identify · locate · environment",
              "warehouses: temperature, humidity, alarms",
            ],
          },
          {
            mem: true, h: "Industrial electronics", w: 3,
            b: [
              "automation of industrial processes",
              "fuses → PLCs, motor drives, robots",
              "automotive, power, chemical plants",
            ],
          },
          {
            mem: true, h: "Photoelectric sensor", w: 6,
            flow: ["pulse generator", "emitter: LED, laser", "object", "receiver: photodiode", "amplifier", "sync detector", "level sensor", "output"],
            dopo: ["receiver tuned to emitter frequency → ignores ambient light"],
          },
        ],
      },
    ],
  },
  {
    titolo: "Unit 15 · Automotive Industry and Environment",
    sezioni: [
      {
        titolo: "Cars",
        box: [
          {
            mem: true, h: "Engine strokes", w: 3,
            flow: ["intake", "compression", "combustion", "exhaust"],
            dopo: ["valves, spark plug, piston, cylinder"],
          },
          {
            mem: true, h: "BEV", w: 3, da: "battery electric vehicle",
            flow: ["rechargeable batteries", "controller", "electric motor", "wheels"],
          },
          {
            mem: true, h: "Electric vehicles", w: 6,
            intest: ["type", "key words"],
            tab: [
              ["BEV", "all-electric, grid charging, zero emissions"],
              ["plug-in hybrid", "short range on battery, then petrol"],
              ["conventional hybrid", "no plug, recharges while braking"],
              ["solar car · fuel cell", "other energy sources"],
            ],
          },
          {
            mem: true, h: "Electric cars", w: 6,
            intest: ["pros", "cons"],
            tab: [
              ["environmentally friendly, quiet", "high cost, limited range"],
              ["lower maintenance", "few charging spots"],
              ["renewables → emission-free", "pollution where power is generated"],
            ],
          },
        ],
      },
      {
        titolo: "Electronics",
        box: [
          {
            mem: true, h: "Batteries", w: 6,
            b: ["chemical energy → electricity → mechanical energy"],
            intest: ["Li-ion pros", "Li-ion cons"],
            tab: [
              ["high specific energy", "life span ~5 years"],
              ["saves space, weight", "flammable"],
              ["good charging time", "only −10 → +30 °C"],
            ],
            dopo: ["specific energy = energy/kg · specific power = power/kg"],
          },
          {
            mem: true, h: "ECU", w: 3, da: "electronic control unit",
            flow: ["20–50 sensors", "ECU", "20–30 actuators"],
            dopo: ["car ≈ 80% electronics", "40–100 ECUs"],
          },
          {
            mem: true, h: "Energy efficiency", w: 3, da: "greenhouse gases",
            flow: ["temperature + humidity sensor", "ventilation", "no fogging", "air-con off"],
          },
          {
            mem: true, h: "Sensor types", w: 3,
            tab: [
              ["engine", "oxygen, throttle"],
              ["speed", "wheel, piezoelectric"],
              ["vehicle", "parking, rain"],
            ],
          },
          {
            mem: true, h: "Lidar", w: 3, da: "self-driving car",
            b: [
              "light detection and ranging",
              "laser pulses → 3-D map",
              "bulky, expensive → solid-state",
            ],
          },
        ],
      },
    ],
  },
];
facciate.legenda = "⇐ si collega a";
facciate.scala = 1.45;
module.exports = facciate;
