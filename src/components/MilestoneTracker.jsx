import { CheckCircle, Circle } from 'lucide-react';

export default function MilestoneTracker({ milestones }) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-2">Project Milestones</h3>
      <ul className="space-y-2">
        {milestones.map((milestone, index) => (
          <li key={milestone.id} className="flex items-center">
            {milestone.completed ? (
              <CheckCircle className="text-green-500 mr-2" size={16} />
            ) : (
              <Circle className="text-gray-300 mr-2" size={16} />
            )}
            <span className={milestone.completed ? 'line-through text-gray-500' : ''}>
              {milestone.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}