import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userLogin from "../../services/userLogin";
import { useFormValidator } from "../../helpers/formValidator/useFormValidator";
import styles from "../../ValidationForm.module.css";
import FormFieldset from "../FormFieldset";


function LoginForm({ onError }) {
	const [form, setForm] = useState({ email: "", password: "" });
	const { errors, validateForm, onBlurField } = useFormValidator(form);
	const { setAuthState } = useAuth();
	const navigate = useNavigate();

	const onUpdateField = e => {
		const field = e.target.name;
		const nextFormState = {
			...form,
			[field]: e.target.value,
		};

		setForm(nextFormState);
		if (errors[field].dirty)
			validateForm({
				form: nextFormState,
				errors,
				field,
			});
	};

	const onSubmitForm = e => {
		e.preventDefault();
		const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
		if (!isValid) return;

		if (isValid) {
			userLogin(form)
				.then(setAuthState)
				.then(() => navigate("/"))
				.catch(onError);
		}
	};

	return (
		<form onSubmit={onSubmitForm}>
			<FormFieldset
				placeholder={"Email"}
				name="email"
				testid="email-input"
				handler={onUpdateField}
				onBlur={onBlurField}
				value={form.email}
				error={errors.email.dirty && errors.email.error && errors.email.message}
			></FormFieldset>

			<FormFieldset
				placeholder={"Password"}
				name="password"
				testid="password-input"
				handler={onUpdateField}
				onBlur={onBlurField}
				value={form.password}
				type="password"
				error={errors.password.dirty && errors.password.error && errors.password.message}
			></FormFieldset>

			<div className={styles.formActions}>
				<button className="btn btn-lg btn-primary pull-xs-right" type="submit" data-testid="signin-btn">
					Sign in
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
