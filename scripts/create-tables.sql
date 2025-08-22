-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO users (email, password, name, role) VALUES
('admin@inenco.com', 'admin123', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO news (title, short_description, content, image, date) VALUES
('Nueva Actualización de Sistema', 'Hemos lanzado una nueva actualización con mejoras significativas.', 'Esta actualización incluye optimizaciones importantes que mejoran la velocidad de procesamiento en un 30%.', '/placeholder.svg?height=300&width=500&text=Sistema', '2024-01-15'),
('Expansión de Servicios', 'Ampliamos nuestra cobertura de servicios para atender mejor a nuestros clientes.', 'Con esta expansión, ahora ofrecemos soporte 24/7 y nuevos servicios de consultoría especializada.', '/placeholder.svg?height=300&width=500&text=Servicios', '2024-01-10'),
('Certificación ISO Obtenida', 'Hemos obtenido la certificación ISO 27001 para gestión de seguridad.', 'Esta certificación demuestra nuestro compromiso con los más altos estándares de seguridad.', '/placeholder.svg?height=300&width=500&text=ISO', '2024-01-05')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
