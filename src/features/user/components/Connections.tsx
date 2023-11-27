import List from "./List"
import Row from "./Row"


function Connections() {
    return (
        <>
            <Row title={`Connections`} >
                <List connected />
            </Row>
        </>
    )
}

export default Connections