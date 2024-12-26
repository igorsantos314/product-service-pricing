import backgroundImage from '../images/background.webp';

const BackgroundImage = () => {
    return (
        <div className=''>
            <div
                className="absolute rigth-0 left-0 right-0 bottom-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover', // Faz com que a imagem cubra a tela, cortando o excesso
                    backgroundPosition: 'center', // Centraliza a imagem
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed', // Evita a repetição da imagem
                    height: '100vh',
                }}> 
            </div>

            {/* Camada semitransparente para opacidade */}
            <div 
                className="absolute top-0 left-0 right-0 bottom-0 z-1 bg-black opacity-40"
                style={{
                    height: '100vh'
                }}>
            </div>       
        </div>
    )
}

export default BackgroundImage