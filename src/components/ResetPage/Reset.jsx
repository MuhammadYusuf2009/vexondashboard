// src/pages/Reset.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { TextField, Button, Typography, Container } from '@mui/material';

export default function Reset() {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = getAuth();

    const oobCode = searchParams.get('oobCode');

    useEffect(() => {
        if (oobCode) {
            verifyPasswordResetCode(auth, oobCode)
                .then(email => {
                    setEmail(email);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Havola eskirgan yoki noto‘g‘ri. Iltimos, qayta urinib ko‘ring.');
                    setLoading(false);
                });
        } else {
            setError('Havola to‘liq emas.');
            setLoading(false);
        }
    }, [auth, oobCode]);

    const handleReset = async () => {
        setError('');
        if (newPassword !== confirmPassword) {
            return setError("Parollar mos kelmayapti.");
        }
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setSuccess("Parolingiz muvaffaqiyatli tiklandi. Endi login qilishingiz mumkin.");
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError("Parolni tiklashda xatolik yuz berdi.");
        }
    };

    if (loading) return <p>Yuklanmoqda...</p>;

    return (
        <Container maxWidth="sm" style={{ marginTop: '4rem' }}>
            <Typography variant="h5" gutterBottom>Yangi parol o‘rnating</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}

            {!success && (
                <>
                    <TextField
                        label="Yangi parol"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="Parolni tasdiqlang"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleReset} fullWidth>
                        Parolni tiklash
                    </Button>
                </>
            )}
        </Container>
    );
}
