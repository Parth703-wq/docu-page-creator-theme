
import React, { useState } from 'react';
import { Upload, Github } from 'lucide-react';

const DocumentationGenerator = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'github'>('manual');
  const [codeInput, setCodeInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload here
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload here
      console.log('File selected:', e.target.files[0]);
    }
  };

  const getLineCount = () => {
    return codeInput.split('\n').length;
  };

  const getCharacterCount = () => {
    return codeInput.length;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold mb-6">
          Generate documentation{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            instantly
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Paste your JavaScript, React, or any code below and get instant documentation generation with AI-powered analysis
        </p>
      </div>

      {/* Tab Buttons */}
      <div className="flex justify-center mb-8 px-4">
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'manual'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Manual Input
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'github'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Github size={16} />
            GitHub Repository
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {activeTab === 'manual' ? (
          // Manual Input Section - Updated Design
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-white">Code Input</h2>
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all text-lg">
                Analyze Code
              </button>
            </div>
            
            <div className="mb-6">
              <textarea
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full h-96 bg-slate-900 border-2 border-purple-500/50 rounded-xl p-6 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-mono text-sm resize-none"
              />
            </div>
            
            <div className="flex justify-between text-sm text-gray-400">
              <span>Lines: {getLineCount()}</span>
              <span>Characters: {getCharacterCount()}</span>
            </div>
          </div>
        ) : (
          // GitHub Repository Section
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">GitHub Repository Analysis</h2>
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all">
                Analyze Repository
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-3 font-medium">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>

            <div className="text-center text-gray-400 mb-6">OR</div>

            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-3 font-medium">
                Upload Repository Files
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-300 mb-2">Click to upload files or drag and drop</p>
                <p className="text-gray-500 text-sm">Supports .js, .jsx, .ts, .tsx files</p>
                <input
                  type="file"
                  multiple
                  accept=".js,.jsx,.ts,.tsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="absolute inset-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationGenerator;
