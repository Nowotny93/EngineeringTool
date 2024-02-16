import './Header.css'

const Header = () => {
    return (
        <nav className="navbar">
            <img src={'https://th.bing.com/th/id/R.caf3420b11ca9e7cee9eec091cdb6553?rik=rOUpJtFj5r9vmQ&riu=http%3a%2f%2fwww.efc-academy.com%2fefca%2fwww%2fwp-content%2fuploads%2f2014%2f08%2fLufthansa_Technik_white.png&ehk=X6ln4BN8n6H0oyi%2fBep9XmmOelVotLjHD2%2bBvkQuLGU%3d&risl=&pid=ImgRaw&r=0'} className="Logo" />
            <div className='engineeringToolLabel'>
                    Engineering Tool
            </div>
        </nav>
    )
}

export default Header