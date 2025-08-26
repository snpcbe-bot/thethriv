import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Trash2, BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import { expertImportService } from '../../services/expertImportService';
import { sampleExperts } from '../../data/sampleExperts';
import type { ImportResult } from '../../types/expert';

const ExpertImport: React.FC = () => {
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    seo: 0,
    influencer: 0,
    verified: 0,
    countries: [] as string[]
  });

  const loadStats = async () => {
    const newStats = await expertImportService.getImportStats();
    setStats(newStats);
  };

  React.useEffect(() => {
    loadStats();
  }, []);

  const handleImportSampleData = async () => {
    setImporting(true);
    setImportResult(null);

    try {
      const result = await expertImportService.importExperts(sampleExperts);
      setImportResult(result);
      await loadStats();
    } catch (error: any) {
      setImportResult({
        imported: 0,
        skipped: 0,
        errors: [error.message],
        batchId: 'failed'
      });
    } finally {
      setImporting(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to delete ALL expert data? This cannot be undone.')) {
      return;
    }

    setImporting(true);
    try {
      const result = await expertImportService.clearAllExperts();
      if (result.error) {
        alert(`Error: ${result.error}`);
      } else {
        alert(`Deleted ${result.deleted} experts`);
        await loadStats();
        setImportResult(null);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportResult(null);

    try {
      const content = await file.text();
      let result: ImportResult;

      if (file.name.endsWith('.csv')) {
        result = await expertImportService.importFromCSV(content);
      } else if (file.name.endsWith('.json')) {
        const jsonData = JSON.parse(content);
        result = await expertImportService.importExperts(Array.isArray(jsonData) ? jsonData : [jsonData]);
      } else {
        throw new Error('Unsupported file format. Please use CSV or JSON.');
      }

      setImportResult(result);
      await loadStats();
    } catch (error: any) {
      setImportResult({
        imported: 0,
        skipped: 0,
        errors: [error.message],
        batchId: 'failed'
      });
    } finally {
      setImporting(false);
    }

    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert Data Management</h2>
        <p className="text-lg text-gray-600">Import and manage expert profiles for testing</p>
      </div>

      {/* Current Stats */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Current Database Stats</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-600">Total Experts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.seo}</div>
            <div className="text-gray-600">SEO Experts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.influencer}</div>
            <div className="text-gray-600">Influencers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.verified}</div>
            <div className="text-gray-600">Verified</div>
          </div>
        </div>

        {stats.countries.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Countries Covered:</h4>
            <div className="flex flex-wrap gap-2">
              {stats.countries.map(country => (
                <span key={country} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm">
                  {country}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Import Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Sample Data Import */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Import Sample Data</h3>
            <p className="text-gray-600 mb-6">
              Load {sampleExperts.length} sample experts for testing
            </p>
            <button
              onClick={handleImportSampleData}
              disabled={importing}
              className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {importing ? 'Importing...' : 'Import Sample Data'}
            </button>
          </div>
        </div>

        {/* File Import */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Import from File</h3>
            <p className="text-gray-600 mb-6">
              Upload CSV or JSON file with expert data
            </p>
            <label className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer inline-block">
              {importing ? 'Processing...' : 'Choose File'}
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileImport}
                disabled={importing}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Clear Data */}
        <div className="bg-white rounded-2xl p-6 border border-red-200">
          <div className="text-center">
            <Trash2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Clear All Data</h3>
            <p className="text-gray-600 mb-6">
              Remove all expert profiles from database
            </p>
            <button
              onClick={handleClearData}
              disabled={importing || stats.total === 0}
              className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {importing ? 'Clearing...' : 'Clear All Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Import Results */}
      {importResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 ${
            importResult.errors.length > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-4">
            {importResult.errors.length > 0 ? (
              <AlertCircle className="w-6 h-6 text-red-600" />
            ) : (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
            <h3 className="text-lg font-bold text-gray-900">Import Results</h3>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{importResult.imported}</div>
              <div className="text-gray-600">Imported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{importResult.skipped}</div>
              <div className="text-gray-600">Skipped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{importResult.errors.length}</div>
              <div className="text-gray-600">Errors</div>
            </div>
          </div>

          {importResult.errors.length > 0 && (
            <div>
              <h4 className="font-semibold text-red-900 mb-2">Errors:</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {importResult.errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-700 bg-red-100 rounded px-3 py-1">
                    {error}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* CSV Format Guide */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">CSV Import Format</h3>
        <p className="text-gray-600 mb-4">
          Your CSV file should include these columns (required fields marked with *):
        </p>
        <div className="bg-white rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <div className="text-gray-800">
            name*,email*,expert_type*,country*,city,bio,skills,years_experience,price_range,hourly_rate,follower_count,engagement_rate,client_count,website_url,linkedin_url,verified,languages,response_time_hours
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Notes:</strong></p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>expert_type: "seo" or "influencer"</li>
            <li>price_range: "budget", "mid", or "premium"</li>
            <li>skills: separate multiple skills with semicolons (;)</li>
            <li>languages: separate multiple languages with semicolons (;)</li>
            <li>verified: "true" or "false"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpertImport;