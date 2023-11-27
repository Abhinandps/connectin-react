import Card from './Card'
import List from './List'
import Row from './Row'

function Main() {
    return (
        <>
            <Row title="Pending invitations" >
                <List />
                <List />
            </Row>
            <Row title="Software Engineers you may know">
                <div className='flex flex-wrap gap-4 px-5'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </Row>
        </>
    )
}

export default Main