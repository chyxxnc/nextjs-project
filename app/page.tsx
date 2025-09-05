export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-[70px] font-semibold">Welcome</div>
        <div className="text-sm">
          <a href="/login">LOGIN</a> | <a href="/signup">SIGNUP</a>
        </div>
      </div>
    </main>
  );
}
