import Image from "next/image";

export default function Home() {
	return (
		<div>	
			<div id='login'">
				<form>
					<div>
						<label htmlFor="username">Username</label>
						<input type="text" name="username" id="username" />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="text" name="password" id="password" />
					</div>
					<div>
						<button type="submit">Login</button>
					</div>
				</form>
		</div>
		<div id='login'">
				<form>
					<div>
						<label htmlFor="username">Username</label>
						<input type="text" name="username" id="username" />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input type="text" name="password" id="password" />
					</div>
					<div>
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		</div>
	);
}
