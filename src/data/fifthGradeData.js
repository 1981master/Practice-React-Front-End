export const multiplicationTables = Array.from({ length: 12 }, (_, i) => i + 1)

export const mathChallenges = [
    {
        id: 1,
        question: '12 × 3 = ?',
        options: ['36', '32', '34'],
        answer: '36',
    },
    { id: 2, question: '9 × 7 = ?', options: ['63', '56', '65'], answer: '63' },
    { id: 3, question: '15 ÷ 3 = ?', options: ['5', '4', '6'], answer: '5' },
    {
        id: 4,
        question: '8 + 15 = ?',
        options: ['23', '22', '24'],
        answer: '23',
    },
    { id: 5, question: '18 - 9 = ?', options: ['9', '8', '10'], answer: '9' },

    // Add 20–30 more challenges
    {
        id: 1,
        question: 'What is 45 ÷ 5?',
        options: [5, 9, 10, 15],
        answer: 9,
    },
    {
        id: 2,
        question: 'What is 123 ÷ 3?',
        options: [41, 42, 43, 44],
        answer: 41,
        division: `
   3 | 1 2 3
       - 1 2
       -----
         03
         -3
         ---
          0
        `,
    },
    {
        id: 3,
        question: 'What is 256 ÷ 8?',
        options: [28, 32, 30, 34],
        answer: 32,
        division: `
   8 | 2 5 6
       - 16
       -----
        09
        -8
        ---
         16
         -16
         ---
          0
        `,
    },
]
