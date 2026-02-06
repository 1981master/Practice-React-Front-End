import '../styles/ShapeDisplay.css'

const ShapeDisplay = () => {
    // Define the shapes with varying sides and colors
    const shapes = [
        { name: 'Triangle', type: 'triangle', color: '#FF5733', sides: 3 },
        { name: 'Square', type: 'square', color: '#33FF57', sides: 4 },
        { name: 'Pentagon', type: 'pentagon', color: '#3357FF', sides: 5 },
        { name: 'Hexagon', type: 'hexagon', color: '#FF33A1', sides: 6 },
        { name: 'Heptagon', type: 'heptagon', color: '#A1FF33', sides: 7 },
        { name: 'Octagon', type: 'octagon', color: '#FF5733', sides: 8 },
        { name: 'Nonagon', type: 'nonagon', color: '#33FF57', sides: 9 },
        { name: 'Decagon', type: 'decagon', color: '#3357FF', sides: 10 },
        { name: 'Hendecagon', type: 'hendecagon', color: '#FF33A1', sides: 11 },
        { name: 'Dodecagon', type: 'dodecagon', color: '#A1FF33', sides: 12 },
        { name: 'Tridecagon', type: 'tridecagon', color: '#FF5733', sides: 13 },
        {
            name: 'Tetradecagon',
            type: 'tetradecagon',
            color: '#33FF57',
            sides: 14,
        },
        {
            name: 'Pentadecagon',
            type: 'pentadecagon',
            color: '#3357FF',
            sides: 15,
        },
        {
            name: 'Hexadecagon',
            type: 'hexadecagon',
            color: '#FF33A1',
            sides: 16,
        },
        {
            name: 'Heptadecagon',
            type: 'heptadecagon',
            color: '#A1FF33',
            sides: 17,
        },
        {
            name: 'Octadecagon',
            type: 'octadecagon',
            color: '#FF5733',
            sides: 18,
        },
        {
            name: 'Nonadecagon',
            type: 'nonadecagon',
            color: '#33FF57',
            sides: 19,
        },
        { name: 'Icosagon', type: 'icosagon', color: '#3357FF', sides: 20 },
        {
            name: 'Henicosagon',
            type: 'henicosagon',
            color: '#FF33A1',
            sides: 21,
        },
        { name: 'Docosagon', type: 'docosagon', color: '#A1FF33', sides: 22 },
        { name: 'Tricosagon', type: 'tricosagon', color: '#FF5733', sides: 23 },
        {
            name: 'Tetracosagon',
            type: 'tetracosagon',
            color: '#33FF57',
            sides: 24,
        },
        {
            name: 'Pentacosagon',
            type: 'pentacosagon',
            color: '#3357FF',
            sides: 25,
        },
        {
            name: 'Hexacosagon',
            type: 'hexacosagon',
            color: '#FF33A1',
            sides: 26,
        },
        {
            name: 'Heptacosagon',
            type: 'heptacosagon',
            color: '#A1FF33',
            sides: 27,
        },
        {
            name: 'Octacosagon',
            type: 'octacosagon',
            color: '#FF5733',
            sides: 28,
        },
        {
            name: 'Enneacosagon',
            type: 'enneacosagon',
            color: '#33FF57',
            sides: 29,
        },
        {
            name: 'Icosikaihenagon',
            type: 'icosikaihenagon',
            color: '#3357FF',
            sides: 30,
        },
        {
            name: 'Trikentagon',
            type: 'trikentagon',
            color: '#FF33A1',
            sides: 31,
        },
        {
            name: 'Docosikaihenagon',
            type: 'docosikaihenagon',
            color: '#A1FF33',
            sides: 32,
        },
        { name: 'Tritrigon', type: 'tritrigon', color: '#FF5733', sides: 33 },
        {
            name: 'Tetrakentagon',
            type: 'tetrakentagon',
            color: '#33FF57',
            sides: 34,
        },
        {
            name: 'Pentakentagon',
            type: 'pentakentagon',
            color: '#3357FF',
            sides: 35,
        },
        {
            name: 'Hexakentagon',
            type: 'hexakentagon',
            color: '#FF33A1',
            sides: 36,
        },
        {
            name: 'Heptakentagon',
            type: 'heptakentagon',
            color: '#A1FF33',
            sides: 37,
        },
        {
            name: 'Octakentagon',
            type: 'octakentagon',
            color: '#FF5733',
            sides: 38,
        },
        {
            name: 'Ennekentagon',
            type: 'ennekentagon',
            color: '#33FF57',
            sides: 39,
        },
        {
            name: 'Icosakentagon',
            type: 'icosakentagon',
            color: '#3357FF',
            sides: 40,
        },
        {
            name: 'Henicosakentagon',
            type: 'henicosakentagon',
            color: '#FF33A1',
            sides: 41,
        },
        {
            name: 'Docosakentagon',
            type: 'docosakentagon',
            color: '#A1FF33',
            sides: 42,
        },
        {
            name: 'Tricosakentagon',
            type: 'tricosakentagon',
            color: '#FF5733',
            sides: 43,
        },
        {
            name: 'Tetracosakentagon',
            type: 'tetracosakentagon',
            color: '#33FF57',
            sides: 44,
        },
        {
            name: 'Pentacosakentagon',
            type: 'pentacosakentagon',
            color: '#3357FF',
            sides: 45,
        },
        {
            name: 'Hexacosakentagon',
            type: 'hexacosakentagon',
            color: '#FF33A1',
            sides: 46,
        },
        {
            name: 'Heptacosakentagon',
            type: 'heptacosakentagon',
            color: '#A1FF33',
            sides: 47,
        },
        {
            name: 'Octacosakentagon',
            type: 'octacosakentagon',
            color: '#FF5733',
            sides: 48,
        },
        {
            name: 'Enneacosakentagon',
            type: 'enneacosakentagon',
            color: '#33FF57',
            sides: 49,
        },
        {
            name: 'Triacontakentagon',
            type: 'triacontakentagon',
            color: '#3357FF',
            sides: 50,
        },
    ]

    // Render the shapes
    return (
        <div className="shape-display-container">
            <h1>Geometric Shapes</h1>
            <div className="shapes-grid">
                {shapes.map((shape, index) => (
                    <div
                        key={index}
                        className={`shape-card ${shape.type}`}
                        style={{
                            backgroundColor: shape.color,
                            clipPath: generatePolygon(shape.sides),
                        }}
                    >
                        <div className="shape">{shape.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Function to generate the polygon's clip-path based on number of sides
const generatePolygon = (sides) => {
    const angle = (2 * Math.PI) / sides
    const points = []
    for (let i = 0; i < sides; i++) {
        const x = 50 + 50 * Math.cos(i * angle)
        const y = 50 + 50 * Math.sin(i * angle)
        points.push(`${x}% ${y}%`)
    }
    return `polygon(${points.join(', ')})`
}

export default ShapeDisplay
