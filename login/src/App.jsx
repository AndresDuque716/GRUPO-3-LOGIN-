

function App() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] relative overflow-hidden font-sans">
        
        {/* Background decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
        <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>

        {/* Login Card */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] w-full max-w-md z-10 text-white">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 transform rotate-3">
              <svg className="w-8 h-8 text-white transform -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 mb-2">
            Portal Académico
          </h2>
          <p className="text-center text-gray-300 text-sm mb-8">Ingresa tus credenciales para continuar</p>

          <form className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">Correo electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="ejemplo@universidad.edu"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="block w-5 h-5 bg-white/10 border border-white/20 rounded peer-checked:bg-purple-500 peer-checked:border-purple-500 transition-all"></div>
                  <svg className="absolute inset-0 w-5 h-5 text-white scale-0 peer-checked:scale-100 transition-transform duration-200 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-gray-300 group-hover:text-white transition-colors">Recordarme</span>
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-purple-500/30 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
