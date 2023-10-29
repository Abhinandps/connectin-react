
interface SignOutProps {
    handleLogout: () => void;
}

function SignOut({ handleLogout }: SignOutProps) {
    return (
        <div className="m-2">
            <ul>
                <li onClick={() => handleLogout()}>Sign Out</li>
            </ul>
        </div>
    )
}

export default SignOut