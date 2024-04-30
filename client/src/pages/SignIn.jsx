export default function SignIn() {
  return (
    <div className="signin">
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="email" />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Please enter your password"
        />
      </form>
    </div>
  );
}
