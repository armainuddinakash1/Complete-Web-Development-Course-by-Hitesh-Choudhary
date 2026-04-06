import { useState } from 'react'

export default function Card(props) {
  const { name = 'John Doe', imgUrl } = props
  const [following, setFollowing] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="bg-white rounded-2xl border border-gray-200 w-80 overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="h-24 bg-emerald-700 relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* Avatar */}
          {imgUrl ? (
            <img
              src={imgUrl}
              className="absolute -bottom-7 left-5 w-14 h-14 rounded-full bg-emerald-900 border-[3px] border-white object-cover"
            />
          ) : (
            <div className="absolute -bottom-7 left-5 w-14 h-14 rounded-full bg-emerald-900 border-[3px] border-white flex items-center justify-center text-emerald-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="pt-10 px-5 pb-5">
          <h2 className="text-gray-900 text-xl font-semibold leading-tight">
            {name}
          </h2>
          <p className="text-gray-500 text-sm font-light mt-0.5 mb-3">
            Senior Product Designer · San Francisco
          </p>

          {/* Status badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Open to work
          </span>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { value: '142', label: 'Projects' },
              { value: '8.4k', label: 'Followers' },
              { value: '97%', label: 'Rating' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 rounded-lg px-2 py-2.5 text-center"
              >
                <span className="block text-base font-semibold text-gray-900">
                  {stat.value}
                </span>
                <span className="block text-xs text-gray-400 font-light mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 mb-4" />

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['Figma', 'Design Systems', 'UX Research', 'Prototyping'].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-500"
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button className="py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
              Message
            </button>
            <button
              onClick={() => setFollowing(!following)}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                following
                  ? 'bg-gray-100 text-gray-600 border border-gray-200'
                  : 'bg-emerald-900 text-emerald-300 hover:bg-emerald-800'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
