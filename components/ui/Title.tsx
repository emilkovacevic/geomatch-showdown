interface TitleProps {
  title: string
}

const Title = ({title}: TitleProps) => {
  return (
    <section>
        <h2 
        className="text-xl font-bold"
        >{title}</h2>
    </section>
  )
}

export default Title