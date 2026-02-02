import { useDispatch, useSelector } from 'react-redux'
import { selectKid } from '../../store/kidSlice'

export default function KidSelector() {
    const { list } = useSelector((state) => state.kids)
    const dispatch = useDispatch()

    return (
        <select onChange={(e) => dispatch(selectKid(e.target.value))}>
            <option>Select Kid</option>
            {list.map((k) => (
                <option
                    key={k.id}
                    value={k.id}
                >
                    {k.name}
                </option>
            ))}
        </select>
    )
}
