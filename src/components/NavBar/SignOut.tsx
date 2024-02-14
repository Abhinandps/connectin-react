
interface SignOutProps {
    handleLogout: () => void;
}

function SignOut({ handleLogout }: SignOutProps) {
    return (
        <div className="m-2 cursor-pointer hover:text-red-900" onClick={handleLogout}>
            <ul>
                <li>Sign Out</li>
            </ul>
        </div>
    )
}

export default SignOut