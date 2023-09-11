import HomePage from '@/components/homepage/homepage'
export default function Example({search}) {
  return (
    <div>
    <header>
      <title>Tech Discussion - Question and Answer</title>
    </header>
      <HomePage search={search}/>
    </div>
  )
}

