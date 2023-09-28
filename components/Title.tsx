interface TitleProps {
  title: string
}

const Title = ({title}: TitleProps) => {
  return (
    <section className="px-1">
        <h2>{title}</h2>
    </section>
  )
}

export default Title