import { useSelector } from 'react-redux'
import '../../styles/Analytics.css'
import AccuracyTrendChart from './AccuracyTrendChart'
import OverviewCards from './OverviewCards'
import RecommendationsPanel from './RecommendationsPanel'
import TimeSpentChart from './TimeSpentChart'
import TodoProgressPanel from './TodoProgressPanel'
import TopicMasteryTable from './TopicMasteryTable'

export default function Analytics() {
    const user = useSelector((state) => state.auth.user)
    const kidId = user?.kids?.[0]?.id || 1

    return (
        <div className="analytics-page">
            <OverviewCards kidId={kidId} />
            <div className="analytics-chart">
                <TimeSpentChart kidId={kidId} />
            </div>
            <div className="analytics-chart">
                <AccuracyTrendChart kidId={kidId} />
            </div>
            <TopicMasteryTable kidId={kidId} />
            <RecommendationsPanel kidId={kidId} />
            <TodoProgressPanel kidId={kidId} />
        </div>
    )
}
