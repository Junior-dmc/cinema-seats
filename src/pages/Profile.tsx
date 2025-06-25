import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import type { UserPreferences } from '../types';

const Profile: React.FC = () => {
  const { user, updateProfile, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    preferences: user?.preferences || {
      favoriteGenres: [],
      preferredSeatingArea: 'middle',
      preferredShowtimes: [],
      notificationPreferences: {
        email: true,
        push: true,
        sms: false,
      },
    },
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('preferences.')) {
      const preferencePath = name.split('.');
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [preferencePath[1]]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNotificationChange = (type: keyof UserPreferences['notificationPreferences']) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notificationPreferences: {
          ...prev.preferences.notificationPreferences,
          [type]: !prev.preferences.notificationPreferences[type],
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Perfil do Usuário</h2>
              <div className="space-x-4">
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Editar Perfil
                  </Button>
                )}
                <Button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Sair
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-700 text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-700 text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Área Preferida
                </label>
                <select
                  name="preferences.preferredSeatingArea"
                  value={formData.preferences.preferredSeatingArea}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-700 text-white disabled:opacity-50"
                >
                  <option value="front">Frente</option>
                  <option value="middle">Meio</option>
                  <option value="back">Fundo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notificações
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      checked={formData.preferences.notificationPreferences.email}
                      onChange={() => handleNotificationChange('email')}
                      disabled={!isEditing}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-300">
                      Email
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="push-notifications"
                      checked={formData.preferences.notificationPreferences.push}
                      onChange={() => handleNotificationChange('push')}
                      disabled={!isEditing}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label htmlFor="push-notifications" className="ml-2 text-sm text-gray-300">
                      Push
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sms-notifications"
                      checked={formData.preferences.notificationPreferences.sms}
                      onChange={() => handleNotificationChange('sms')}
                      disabled={!isEditing}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label htmlFor="sms-notifications" className="ml-2 text-sm text-gray-300">
                      SMS
                    </label>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? 'Salvando...' : 'Salvar'}
                  </Button>
                </div>
              )}
            </form>

            {user.purchaseHistory.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Histórico de Compras</h3>
                <div className="space-y-4">
                  {user.purchaseHistory.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="bg-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-medium text-white">{purchase.movieTitle}</h4>
                          <p className="text-sm text-gray-300">
                            {purchase.sessionDate} às {purchase.sessionTime}
                          </p>
                          <p className="text-sm text-gray-300">
                            Assentos: {purchase.seats.join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-white">
                            R$ {purchase.totalAmount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-300">
                            {purchase.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 