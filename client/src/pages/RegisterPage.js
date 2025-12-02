// client/src/pages/RegisterPage.js
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Wrapper = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled(motion.div)`
  width: 100%;
  max-width: 460px;
  padding: 26px 26px 24px;
  border-radius: 20px;
  border: 1px solid var(--card-border);
  background: radial-gradient(circle at top, #1f1633, #050513);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
`;

const Title = styled.h2`
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 18px;
`;

const Field = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  display: block;
  margin-bottom: 6px;
  color: var(--text-muted);
`;

const Input = styled.input`
  width: 100%;
  padding: 9px 11px;
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(3, 4, 11, 0.95);
  color: var(--text-main);
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #ff3366;
    box-shadow: 0 0 12px rgba(255, 51, 102, 0.6);
  }
`;

const Button = styled(motion.button)`
  margin-top: 4px;
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 10px 18px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  background: linear-gradient(135deg, #ff3366, #ffd166);
  box-shadow: 0 0 16px rgba(255, 209, 102, 0.7);
  color: var(--text-main);
  cursor: pointer;
`;

const SmallText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: var(--text-muted);

  a {
    color: var(--accent-secondary);
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #ff6b81;
  margin-bottom: 6px;
`;

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", form);
      login(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Wrapper>
      <Card
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Title>Create account</Title>
        <Subtitle>Join the Movieverse and start building your watch story.</Subtitle>

        {error && <ErrorText>{error}</ErrorText>}

        <form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Field>

          <Button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Sign up
          </Button>
        </form>

        <SmallText>
          Already have an account? <Link to="/login">Log in</Link>
        </SmallText>
      </Card>
    </Wrapper>
  );
};

export default RegisterPage;
