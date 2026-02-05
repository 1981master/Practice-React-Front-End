export const firstGradeAnimals = [
    {
        id: 1,
        name: 'Dolphin',
        emoji: '🐬',
        description: `Dolphins are friendly, intelligent marine mammals. They travel in pods and communicate using clicks, whistles, and body movements. Dolphins are playful creatures that often jump out of the water and ride waves. They eat fish and squid, using teamwork to herd their prey. Dolphins have excellent eyesight and echolocation, which allows them to find food and navigate. They are curious, social, and can even recognize themselves in mirrors.`,
        // Dolphins don’t have a clear “life cycle” for first grade, so we can skip or keep empty
        lifeCycle: null,
    },
    {
        id: 2,
        name: 'Shark',
        emoji: '🦈',
        description: `Sharks are ancient predators of the ocean, existing for over 400 million years. They come in many shapes and sizes. Sharks have cartilage skeletons and rows of sharp teeth to catch prey. They live in coastal waters, open oceans, and deep-sea regions. Sharks are important for maintaining healthy fish populations.`,
        lifeCycle: null, // Could add simple stages: egg → pup → adult, but optional
    },
    {
        id: 3,
        name: 'Octopus',
        emoji: '🐙',
        description: `Octopuses are intelligent, soft-bodied mollusks with eight flexible arms. They live in coral reefs, rocky crevices, and the ocean floor. Octopuses use camouflage to hide from predators. They eat crabs, shrimp, and small fish. They are clever problem-solvers and mostly hunt at night.`,
        lifeCycle: [
            {
                stage: 'Egg',
                emoji: '🥚',
                text: 'Octopus eggs are laid and protected by the mother.',
            },
            {
                stage: 'Hatchling',
                emoji: '🐙',
                text: 'Tiny baby octopuses hatch and swim into the ocean.',
            },
            {
                stage: 'Juvenile',
                emoji: '🐙',
                text: 'Young octopuses grow and explore hiding places.',
            },
            {
                stage: 'Adult',
                emoji: '🐙',
                text: 'Adults hunt, reproduce, and continue the cycle.',
            },
        ],
    },
    {
        id: 4,
        name: 'Sea Turtle',
        emoji: '🐢',
        description: `Sea turtles are gentle reptiles living in warm oceans. They have hard shells that protect them and strong flippers to swim. Sea turtles migrate long distances between feeding grounds and nesting beaches. They eat jellyfish, seaweed, and small invertebrates. Female turtles return to their birth beaches to lay eggs.`,
        lifeCycle: [
            {
                stage: 'Egg',
                emoji: '🥚',
                text: 'Turtle eggs are laid on sandy beaches.',
            },
            {
                stage: 'Hatchling',
                emoji: '🐢',
                text: 'Hatchlings emerge and crawl to the sea.',
            },
            {
                stage: 'Juvenile',
                emoji: '🐢',
                text: 'Young turtles grow in the ocean.',
            },
            {
                stage: 'Adult',
                emoji: '🐢',
                text: 'Adults return to lay eggs and continue the cycle.',
            },
        ],
    },
    {
        id: 5,
        name: 'Clownfish',
        emoji: '🐠',
        description: `Clownfish are small, brightly colored fish living in coral reefs, usually among sea anemones. Anemones protect them from predators, and clownfish provide cleaning and food scraps. They live in small groups with a dominant female and are active during the day.`,
        lifeCycle: [
            {
                stage: 'Egg',
                emoji: '🥚',
                text: 'Clownfish eggs are laid near anemones.',
            },
            {
                stage: 'Larva',
                emoji: '🐟',
                text: 'Larvae swim freely in the ocean plankton.',
            },
            {
                stage: 'Juvenile',
                emoji: '🐠',
                text: 'Young clownfish hide in anemones and grow.',
            },
            {
                stage: 'Adult',
                emoji: '🐠',
                text: 'Adults live in groups and reproduce to continue the cycle.',
            },
        ],
    },
    {
        id: 6,
        name: 'Starfish',
        emoji: '⭐',
        description: `Starfish are unique sea creatures with five arms. They live on the ocean floor and eat mollusks like clams. Starfish have no brain but can sense light and touch. They can regenerate lost arms, which helps them survive attacks.`,
        lifeCycle: [
            {
                stage: 'Larva',
                emoji: '🐟',
                text: 'Starfish larvae float in the ocean currents.',
            },
            {
                stage: 'Juvenile',
                emoji: '⭐',
                text: 'Young starfish settle on the ocean floor.',
            },
            {
                stage: 'Adult',
                emoji: '⭐',
                text: 'Adults grow arms and reproduce.',
            },
        ],
    },
    {
        id: 7,
        name: 'Jellyfish',
        emoji: '🌊',
        description: `Jellyfish are soft-bodied, transparent animals that drift with ocean currents. They range in size and use tentacles to capture small fish and plankton. Jellyfish do not have brains, hearts, or bones, yet survive efficiently. Some can glow in the dark.`,
        lifeCycle: [
            {
                stage: 'Polyp',
                emoji: '🌱',
                text: 'Jellyfish start as tiny polyps attached to surfaces.',
            },
            {
                stage: 'Ephyra',
                emoji: '🌊',
                text: 'Polyps transform into free-swimming ephyra.',
            },
            {
                stage: 'Adult',
                emoji: '🌊',
                text: 'Ephyra grow into adult jellyfish that can reproduce.',
            },
        ],
    },
    {
        id: 8,
        name: 'Seahorse',
        emoji: '🧜‍♂️',
        description: `Seahorses are small fish with horse-like heads and curled tails. They live in seagrass beds, coral reefs, and mangroves. Seahorses eat tiny crustaceans and plankton. Male seahorses carry the eggs in a pouch until they hatch.`,
        lifeCycle: [
            {
                stage: 'Egg',
                emoji: '🥚',
                text: 'Male seahorses carry the eggs in a pouch.',
            },
            {
                stage: 'Hatchling',
                emoji: '🐟',
                text: 'Baby seahorses hatch and swim away.',
            },
            {
                stage: 'Juvenile',
                emoji: '🐟',
                text: 'Young seahorses grow in seagrass and reefs.',
            },
            {
                stage: 'Adult',
                emoji: '🧜‍♂️',
                text: 'Adults reproduce and continue the cycle.',
            },
        ],
    },
    {
        id: 9,
        name: 'Crab',
        emoji: '🦀',
        description: `Crabs are crustaceans with hard shells and ten legs. They live in oceans, beaches, and estuaries. Crabs eat algae, plankton, small fish, and detritus. They walk sideways and hide under rocks to escape predators.`,
        lifeCycle: [
            {
                stage: 'Egg',
                emoji: '🥚',
                text: 'Crab eggs are carried under the female’s abdomen.',
            },
            {
                stage: 'Larva',
                emoji: '🦀',
                text: 'Larvae float in the plankton before settling.',
            },
            {
                stage: 'Juvenile',
                emoji: '🦀',
                text: 'Young crabs grow and develop claws.',
            },
            {
                stage: 'Adult',
                emoji: '🦀',
                text: 'Adults reproduce and continue the cycle.',
            },
        ],
    },
    {
        id: 10,
        name: 'Lobster',
        emoji: '🦞',
        description: `Lobsters are large marine crustaceans with strong claws and long antennae. They live on rocky ocean floors and hide in crevices. Lobsters grow by molting their shells and are mostly nocturnal hunters.`,
        lifeCycle: [
            {
                stage: 'Egg',
                emoji: '🥚',
                text: 'Female lobsters carry eggs under their tails.',
            },
            {
                stage: 'Larva',
                emoji: '🦞',
                text: 'Lobster larvae float in the plankton.',
            },
            {
                stage: 'Juvenile',
                emoji: '🦞',
                text: 'Young lobsters hide in rocks and grow claws.',
            },
            {
                stage: 'Adult',
                emoji: '🦞',
                text: 'Adults hunt, reproduce, and molt shells.',
            },
        ],
    },
]
