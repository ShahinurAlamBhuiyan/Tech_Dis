import HomePage from '@/components/homepage/homepage'
export default function Example({search}) {
  return (
    <div>
    <header>
      <title>AlgoMaster - Question and Answer</title>
    </header>
      <HomePage search={search}/>
    </div>
  )
}

