// hooks/useApi.ts
import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';

export function useApi<T>(apiCall: () => Promise<T>, immediate = true) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { data, error, loading, execute, refetch: execute };
}

// Hook for starting a conversation
export function useStartConversation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const startConversation = async (text: string, imageInput?: string, audioInput?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.startConversation({ 
        text_input: text,
        image_input: imageInput,
        audio_input: audioInput
      });
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { startConversation, loading, error, data };
}

// Hook for continuing clarifier
export function useContinueClarifier() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const continueClarifier = async (threadId: string, answers: string[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.continueClarifier({ thread_id: threadId, answers });
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { continueClarifier, loading, error, data };
}

// Hook for running workflow
export function useRunWorkflow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const runWorkflow = async (threadId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.runWorkflow({ thread_id: threadId });
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { runWorkflow, loading, error, data };
}

// Hook for getting workflow result
export function useGetResult(threadId?: string) {
  const { data, error, loading, execute } = useApi(
    () => apiService.getResult(threadId!),
    !!threadId
  );

  return { data, error, loading, refetch: execute };
}

// Hook for getting workflow progress
export function useGetProgress(threadId?: string) {
  const { data, error, loading, execute } = useApi(
    () => apiService.getProgress(threadId!),
    !!threadId
  );

  return { data, error, loading, refetch: execute };
}

// Hook for running workflow stream
export function useRunWorkflowStream() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const runWorkflowStream = async (
    text: string, 
    imageInput?: string, 
    audioInput?: string,
    onProgress?: (progress: any) => void
  ) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const stream = await apiService.runWorkflowStream({ 
        text_input: text,
        image_input: imageInput,
        audio_input: audioInput
      });
      
      if (!stream) {
        throw new Error('Stream is null');
      }
      
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      
      let result = '';
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        
        // Try to parse each line as JSON
        const lines = result.split('\n');
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];
          if (line.trim()) {
            try {
              const json = JSON.parse(line);
              setData(json);
              if (onProgress) onProgress(json);
            } catch (e) {
              // Not JSON, continue
            }
          }
        }
        
        // Keep only incomplete last line
        result = lines[lines.length - 1];
      }
      
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { runWorkflowStream, loading, error, data };
}

// Hook for user projects
export function useUserProjects(userId?: string) {
  const { data, error, loading, execute } = useApi(
    () => apiService.getUserProjects(userId!),
    !!userId
  );

  return { data, error, loading, refetch: execute };
}