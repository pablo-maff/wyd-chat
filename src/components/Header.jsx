export function Header() {
  return (
    <header class="bg-white p-4 border border-green-500">
      <div class="flex flex-row">
        <div class="w-1/3 pr-4 flex justify-between items-center">
          <h3 class="text-2xl text-green-800 font-semibold border border-blue-500">wyd-chat</h3>
          <h6>Settings</h6>
        </div>
        <div class="w-2/3 flex justify-between items-center">
          <div class="flex items-center">
            <div class="mr-2">
              <h6>Avatar</h6>
            </div>
            <div>
              <h3 class="text-2xl text-green-800 font-semibold border border-red-500">User Name</h3>
              <p>Typing...</p>
            </div>
          </div>
          <div>
            Icons
          </div>
        </div>
      </div>
    </header>
  )
}
