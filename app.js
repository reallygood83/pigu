// Lucide 아이콘 컴포넌트 생성
const { createIcons, Calendar, Clock, Award } = lucide;

// 페이지 로드 시 아이콘 초기화
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Color palette for teams
const teamColors = {
  '1반': '#FF5252',
  '2반': '#4CAF50',
  '3반': '#2196F3',
  '4반': '#FFC107',
  '5반': '#9C27B0',
  '6반': '#FF9800'
};

// Schedule data
const leagueInfo = [
  { title: '사전경기', description: '각 반 3경기 (10월 2일~10월 10일)' },
  { title: '본선경기', description: '각 반 5경기 (10월 14일~10월 24일)' },
  { title: '총 경기수', description: '27경기 (사전 12경기 + 본선 15경기)' },
  { title: '경기방식', description: '하루 2경기 / 각 반 하루 1경기 / 2코트 운영' },
  { title: '참여반', description: '6개 반 (1반 ~ 6반)' },
];

const preliminaryMatches = [
  { date: '10월 2일', day: '수', courtA: '1반 vs 2반', courtB: '3반 vs 4반', teams: ['1반', '2반', '3반', '4반'] },
  { date: '10월 4일', day: '금', courtA: '5반 vs 6반', courtB: '1반 vs 3반', teams: ['1반', '3반', '5반', '6반'] },
  { date: '10월 7일', day: '월', courtA: '2반 vs 4반', courtB: '1반 vs 5반', teams: ['1반', '2반', '4반', '5반'] },
  { date: '10월 8일', day: '화', courtA: '2반 vs 6반', courtB: '3반 vs 5반', teams: ['2반', '3반', '5반', '6반'] },
  { date: '10월 10일', day: '목', courtA: '4반 vs 6반', courtB: '없음', teams: ['4반', '6반'] },
];

const mainMatches = [
  { date: '10월 14일', day: '월', courtA: '1반 vs 2반', courtB: '3반 vs 4반', teams: ['1반', '2반', '3반', '4반'] },
  { date: '10월 15일', day: '화', courtA: '5반 vs 6반', courtB: '1반 vs 3반', teams: ['1반', '3반', '5반', '6반'] },
  { date: '10월 16일', day: '수', courtA: '1반 vs 4반', courtB: '2반 vs 5반', teams: ['1반', '2반', '4반', '5반'] },
  { date: '10월 17일', day: '목', courtA: '2반 vs 6반', courtB: '3반 vs 5반', teams: ['2반', '3반', '5반', '6반'] },
  { date: '10월 18일', day: '금', courtA: '1반 vs 5반', courtB: '4반 vs 6반', teams: ['1반', '4반', '5반', '6반'] },
  { date: '10월 21일', day: '월', courtA: '1반 vs 6반', courtB: '2반 vs 3반', teams: ['1반', '2반', '3반', '6반'] },
  { date: '10월 22일', day: '화', courtA: '3반 vs 6반', courtB: '2반 vs 4반', teams: ['2반', '3반', '4반', '6반'] },
  { date: '10월 24일', day: '목', courtA: '4반 vs 5반', courtB: '없음', teams: ['4반', '5반'] },
];

const classSchedules = [
  {
    class: '1반',
    preliminary: ['10/2 vs 2반', '10/4 vs 3반', '10/7 vs 5반'],
    main: ['10/14 vs 2반', '10/15 vs 3반', '10/16 vs 4반', '10/18 vs 5반', '10/21 vs 6반']
  },
  {
    class: '2반',
    preliminary: ['10/2 vs 1반', '10/7 vs 4반', '10/8 vs 6반'],
    main: ['10/14 vs 1반', '10/16 vs 5반', '10/17 vs 6반', '10/21 vs 3반', '10/22 vs 4반']
  },
  {
    class: '3반',
    preliminary: ['10/2 vs 4반', '10/4 vs 1반', '10/8 vs 5반'],
    main: ['10/14 vs 4반', '10/15 vs 1반', '10/17 vs 5반', '10/21 vs 2반', '10/22 vs 6반']
  },
  {
    class: '4반',
    preliminary: ['10/2 vs 3반', '10/7 vs 2반', '10/10 vs 6반'],
    main: ['10/14 vs 3반', '10/16 vs 1반', '10/18 vs 6반', '10/22 vs 2반', '10/24 vs 5반']
  },
  {
    class: '5반',
    preliminary: ['10/4 vs 6반', '10/7 vs 1반', '10/8 vs 3반'],
    main: ['10/15 vs 6반', '10/16 vs 2반', '10/17 vs 3반', '10/18 vs 1반', '10/24 vs 4반']
  },
  {
    class: '6반',
    preliminary: ['10/4 vs 5반', '10/8 vs 2반', '10/10 vs 4반'],
    main: ['10/15 vs 5반', '10/17 vs 2반', '10/18 vs 4반', '10/21 vs 1반', '10/22 vs 3반']
  }
];

class DodgeballSchedule extends React.Component {
  renderMatchText(match) {
    if (match === '없음') return match;
    
    const teams = match.split(' vs ');
    return (
      <>
        <span style={{ color: teamColors[teams[0]], fontWeight: 'bold' }}>{teams[0]}</span>
        <span> vs </span>
        <span style={{ color: teamColors[teams[1]], fontWeight: 'bold' }}>{teams[1]}</span>
      </>
    );
  }

  renderMatchList(matchList) {
    return matchList.map((match, index) => {
      const parts = match.split(' vs ');
      const opponent = parts[1];
      return (
        <div key={index} className="mb-1 flex items-center">
          <div 
            className="mr-2 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full" 
            style={{ backgroundColor: teamColors[opponent], color: 'white', fontSize: '0.7rem' }}
          >
            {opponent.replace('반', '')}
          </div>
          <div>{match}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="bg-gray-100 p-6 font-sans">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">박달초 6학년 피구 리그전</h1>
              <p className="text-xl mt-2">박진감 넘치는 대회 일정표</p>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://via.placeholder.com/120" 
                alt="Dodgeball Icon" 
                className="rounded-full border-4 border-white" 
              />
            </div>
          </div>
        </div>
        
        {/* League Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <i data-lucide="award" className="mr-2 text-yellow-500"></i>
            리그 구성
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leagueInfo.map((info, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-bold text-gray-700">{info.title}</h3>
                <p className="text-gray-800">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Colors Legend */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">참가 반 컬러</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(teamColors).map(([team, color]) => (
              <div key={team} className="flex items-center">
                <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                <span className="font-bold">{team}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Preliminary Matches */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <i data-lucide="calendar" className="mr-2 text-blue-500"></i>
            사전경기 일정 (10월 2일 ~ 10월 10일)
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-left">날짜</th>
                  <th className="border p-3 text-left">요일</th>
                  <th className="border p-3 text-left">A코트 경기</th>
                  <th className="border p-3 text-left">B코트 경기</th>
                  <th className="border p-3 text-left">참여 반</th>
                </tr>
              </thead>
              <tbody>
                {preliminaryMatches.map((match, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border p-3 font-bold">{match.date}</td>
                    <td className="border p-3">{match.day}</td>
                    <td className="border p-3">{this.renderMatchText(match.courtA)}</td>
                    <td className="border p-3">{this.renderMatchText(match.courtB)}</td>
                    <td className="border p-3">
                      <div className="flex flex-wrap gap-1">
                        {match.teams.map(team => (
                          <span 
                            key={team} 
                            className="px-2 py-1 rounded-full text-xs font-bold text-white" 
                            style={{ backgroundColor: teamColors[team] }}
                          >
                            {team}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Main Matches */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <i data-lucide="calendar" className="mr-2 text-red-500"></i>
            본선 풀리그 일정 (10월 14일 ~ 10월 24일)
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3 text-left">날짜</th>
                  <th className="border p-3 text-left">요일</th>
                  <th className="border p-3 text-left">A코트 경기</th>
                  <th className="border p-3 text-left">B코트 경기</th>
                  <th className="border p-3 text-left">참여 반</th>
                </tr>
              </thead>
              <tbody>
                {mainMatches.map((match, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border p-3 font-bold">{match.date}</td>
                    <td className="border p-3">{match.day}</td>
                    <td className="border p-3">{this.renderMatchText(match.courtA)}</td>
                    <td className="border p-3">{this.renderMatchText(match.courtB)}</td>
                    <td className="border p-3">
                      <div className="flex flex-wrap gap-1">
                        {match.teams.map(team => (
                          <span 
                            key={team} 
                            className="px-2 py-1 rounded-full text-xs font-bold text-white" 
                            style={{ backgroundColor: teamColors[team] }}
                          >
                            {team}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Class-specific Schedules */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <i data-lucide="clock" className="mr-2 text-green-500"></i>
            반별 경기 일정표
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classSchedules.map((schedule) => (
              <div 
                key={schedule.class} 
                className="border-2 rounded-lg p-4" 
                style={{ borderColor: teamColors[schedule.class] }}
              >
                <h3 
                  className="text-xl font-bold mb-3 p-2 rounded-md text-white" 
                  style={{ backgroundColor: teamColors[schedule.class] }}
                >
                  {schedule.class}
                </h3>
                <div>
                  <h4 className="font-bold mb-2">사전경기:</h4>
                  {this.renderMatchList(schedule.preliminary)}
                  
                  <h4 className="font-bold mt-4 mb-2">본선경기:</h4>
                  {this.renderMatchList(schedule.main)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-gray-600 mt-8">
          <p>박달초등학교 6학년 피구 리그전 2024</p>
          <p className="mt-2 text-sm">열정과 스포츠맨십으로 가득한 대회를 응원합니다!</p>
        </div>
      </div>
    );
  }
}

// 앱 렌더링
ReactDOM.render(<DodgeballSchedule />, document.getElementById('root')); 