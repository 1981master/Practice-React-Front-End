export default function KidCard({ kid }) {
    return (
        <div>
            <h4>{kid.name}</h4>
            <p>Age: {kid.age}</p>
        </div>
    )
}
